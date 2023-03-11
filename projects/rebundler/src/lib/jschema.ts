import {
    createGenerator,
    createProgram,
    createParser,
    createFormatter,
    SchemaGenerator,
    BaseType
} from "ts-json-schema-generator";

import type {
    ReferenceType,
    SubTypeFormatter,
    SubNodeParser,
    FunctionType,
    Definition
} from "ts-json-schema-generator";
import type { Node } from "typescript";

import type { Config } from "./types/config";

import { join } from "path";
import { existsSync } from "fs";
import { readdir, writeFile, mkdir, lstat } from "fs/promises";

class NilType extends BaseType {
    id: string;

    constructor(id: string) {
        super();
        this.id = id;
    }

    getId() {
        return this.id;
    }
}

class NilFormatter implements SubTypeFormatter {
    supportsType(type: ReferenceType) {
        return type instanceof NilType;
    }

    getDefinition(type: FunctionType): Definition {
        return { $ref: type.getId() };
    }

    getChildren() {
        return [];
    }
}

const genID = (file: string) => `${file.substring(0, file.length - 3)}.json`;

class NilParser implements SubNodeParser {
    id: string;
    base: string;
    full: string;

    constructor(id: string, base: string, full: string) {
        this.id = id;
        this.base = base;
        this.full = full;
    }

    supportsNode(node: Node) {
        const full = node.getSourceFile().fileName;
        return full.startsWith(this.base) && full !== this.full;
    }

    createType(node: Node) {
        const rest = node.getSourceFile().fileName.substring(this.base.length + 1);
        return new NilType(genID(rest));
    }
}

const singleGen = (id: string, base: string, path: string) => {
    const cc = {
        path: path,
        type: "*",
        expose: "export",
        schemaId: id,
        topRef: true,
        encodeRefs: true
    } as const;
    return createGenerator(cc);
};

const recursiveGen = (id: string, base: string, path: string) => {
    const cc = {
        path: path,
        type: "*",
        expose: "export",
        schemaId: id,
        topRef: true,
        encodeRefs: true
    } as const;

    const program = createProgram(cc);
    const parser = createParser(program, cc, (prs) =>
        prs.addNodeParser(new NilParser(id, base, path))
    );
    const formatter = createFormatter(cc, (fmt) => fmt.addTypeFormatter(new NilFormatter()));
    return new SchemaGenerator(program, parser, formatter, cc);
};

type MakeGen = (base: string, path: string, id: string) => SchemaGenerator;

const buildfile = async (i: string, o: string, nest: string, f: string, makegen: MakeGen) => {
    const infile = join(i, nest, f);
    if (infile.endsWith(".ts")) {
        const outpath = join(o, nest);
        if (!existsSync(outpath)) {
            await mkdir(outpath);
        }

        const id = genID(join(nest, f));

        const gen = makegen(id, i, infile);
        const schema = gen.createSchema();

        const outfile = join(o, id);
        await writeFile(outfile, JSON.stringify(schema, null, 2));
    }
};

const builddir = async (i: string, o: string, nest: string, makegen: MakeGen) => {
    const inpath = join(i, nest);
    for (const next of await readdir(inpath)) {
        const stat = await lstat(join(inpath, next));
        if (stat.isFile()) {
            await buildfile(i, o, nest, next, makegen);
        }
        if (stat.isDirectory()) {
            await builddir(i, o, join(nest, next), makegen);
        }
    }
};

export const build = async (config: Config) => {
    if (null == config.mode || config.mode.type !== "json") {
        return;
    }

    if (!existsSync(config.out)) {
        await mkdir(config.out);
    }

    if (config.mode.file != null) {
        await builddir(config.in, config.out, "", singleGen);
    } else {
        await builddir(config.in, config.out, "", recursiveGen);
    }
};

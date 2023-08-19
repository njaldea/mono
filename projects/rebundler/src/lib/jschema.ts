import {
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
    Definition,
    MutableParser,
    MutableTypeFormatter,
    CircularReferenceTypeFormatter,
    // use ts definition from ts-json-schema-generator (4.9.3)
    // once a new release is available, we can use ts from our typescript depednency
    ts
} from "ts-json-schema-generator";

import type { Config } from "./types/config";
import { UnionFormatter } from "./unionoverride";

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

    supportsNode(node: ts.Node) {
        const full = node.getSourceFile().fileName;
        return full.startsWith(this.base) && full !== this.full;
    }

    createType(node: ts.Node) {
        const rest = node.getSourceFile().fileName.substring(this.base.length + 1);
        return new NilType(genID(rest));
    }
}

type Maker = (
    base: string,
    path: string,
    id: string
) => {
    parser?: (chain: MutableParser) => void;
    formatter?: (chain: MutableTypeFormatter, ref: CircularReferenceTypeFormatter) => void;
};

const buildfile = async (i: string, o: string, nest: string, f: string, make: Maker) => {
    const infile = join(i, nest, f);
    if (infile.endsWith(".ts")) {
        const outpath = join(o, nest);
        if (!existsSync(outpath)) {
            await mkdir(outpath);
        }

        const id = genID(join(nest, f));
        const cc = {
            path: infile,
            type: "*",
            expose: "export",
            schemaId: id,
            topRef: true,
            encodeRefs: true
        } as const;
        const injector = make(id, i, infile);

        const program = createProgram(cc);
        const schema = new SchemaGenerator(
            program,
            createParser(program, cc, injector.parser),
            createFormatter(cc, injector.formatter),
            cc
        );
        await writeFile(join(o, id), JSON.stringify(schema.createSchema(), null, 2));
    }
};

const builddir = async (i: string, o: string, nest: string, make: Maker) => {
    const inpath = join(i, nest);
    for (const next of await readdir(inpath)) {
        const stat = await lstat(join(inpath, next));
        if (stat.isFile()) {
            await buildfile(i, o, nest, next, make);
        } else if (stat.isDirectory()) {
            await builddir(i, o, join(nest, next), make);
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
        await builddir(config.in, config.out, "", () => ({
            formatter: (chain, ref) => {
                chain.addTypeFormatter(new UnionFormatter(ref));
            }
        }));
    } else {
        await builddir(config.in, config.out, "", (id, base, path) => ({
            parser: (chain) => {
                chain.addNodeParser(new NilParser(id, base, path));
            },
            formatter: (chain, ref) => {
                chain.addTypeFormatter(new NilFormatter());
                chain.addTypeFormatter(new UnionFormatter(ref));
            }
        }));
    }
};

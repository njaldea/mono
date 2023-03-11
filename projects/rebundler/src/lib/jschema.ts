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

import { join, basename } from "path";
import { existsSync } from "fs";
import { readdir, writeFile, mkdir } from "fs/promises";

const genID = (filename: string) => {
    return `${basename(filename, ".ts")}.json`;
};

class NilType extends BaseType {
    id: string;

    constructor(filename: string) {
        super();
        this.id = genID(filename);
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

class NilParser implements SubNodeParser {
    src: string;

    constructor(current: string) {
        this.src = current;
    }

    supportsNode(node: Node) {
        const src = node.getSourceFile().fileName;
        return !src.includes("node_modules/typescript") && src !== this.src;
    }

    createType(node: Node) {
        return new NilType(node.getSourceFile().fileName);
    }
}

export const build = async (config: Config) => {
    if (null == config.mode || config.mode.type !== "json") {
        return;
    }

    if (!existsSync(config.out)) {
        await mkdir(config.out);
    }

    if (config.mode.file != null) {
        const inf = join(config.in, config.mode.file);
        const out = genID(inf);

        const cc = {
            path: inf,
            type: "*",
            expose: "export",
            schemaId: out,
            topRef: true,
            encodeRefs: true
        } as const;
        const schema = createGenerator(cc).createSchema();
        await writeFile(join(config.out, out), JSON.stringify(schema, null, 2));
    } else {
        for (const file of await readdir(config.in)) {
            if ("nil.rebundler.config.js" === file) {
                continue;
            }
            if (file.endsWith(".ts")) {
                const inf = join(config.in, file);
                const out = genID(file);

                const cc = {
                    path: inf,
                    type: "*",
                    expose: "export",
                    schemaId: out,
                    topRef: true,
                    encodeRefs: true
                } as const;

                const program = createProgram(cc);
                const parser = createParser(program, cc, (prs) => {
                    prs.addNodeParser(new NilParser(inf));
                });
                const formatter = createFormatter(cc, (fmt) => {
                    fmt.addTypeFormatter(new NilFormatter());
                });
                const gen = new SchemaGenerator(program, parser, formatter, cc);
                const schema = gen.createSchema();
                await writeFile(join(config.out, out), JSON.stringify(schema, null, 2));
            }
        }
    }
};

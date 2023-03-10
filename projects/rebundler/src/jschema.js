import {
    createGenerator,
    createProgram,
    createParser,
    createFormatter,
    SchemaGenerator,
    BaseType
} from "ts-json-schema-generator";

import { join, basename } from "path";
import { existsSync } from "fs";
import { readdir, writeFile, mkdir } from "fs/promises";

/**
 *  @typedef {import("ts-json-schema-generator").SubNodeParser} SubNodeParser
 *  @typedef {import("ts-json-schema-generator").SubTypeFormatter} SubTypeFormatter
 */

/**
 * @param {string} filename
 */
const genID = (filename) => {
    return `${basename(filename, ".ts")}.json`;
};

class NilType extends BaseType {
    /**
     * @param {string} filename
     */
    constructor(filename) {
        super();
        this.id = genID(filename);
    }
    getId() {
        return this.id;
    }
}

/**
 * @implements {SubTypeFormatter}
 */
class NilFormatter {
    /**
     * @param {import("ts-json-schema-generator").ReferenceType} type
     * @returns {boolean}
     */
    supportsType(type) {
        return type instanceof NilType;
    }

    /**
     * @param {import("ts-json-schema-generator").FunctionType} type
     * @returns {import("ts-json-schema-generator").Definition}
     */
    getDefinition(type) {
        return { $ref: type.getId() };
    }

    getChildren() {
        return [];
    }
}

/**
 * @implements {SubNodeParser}
 */
class NilParser {
    /**
     * @param {string} current
     */
    constructor(current) {
        this.src = current;
    }

    /**
     * @param {import("ts-json-schema-generator").ts.Node} node
     * @returns
     */
    supportsNode(node) {
        const src = node.getSourceFile().fileName;
        return !src.includes("node_modules/typescript") && src !== this.src;
    }

    /**
     * @param {import("ts-json-schema-generator").ts.Node} node
     * @returns
     */
    createType(node) {
        return new NilType(node.getSourceFile().fileName);
    }
}

/**
 * @param {import("../types/config").Config} config
 */
export const build = async (config) => {
    if (config.mode.type !== "json") {
        return;
    }

    if (!existsSync(config.out)) {
        await mkdir(config.out);
    }

    if (config.mode.file != null) {
        const inf = join(config.in, config.mode.file);
        const out = genID(inf);

        /** @type {import('ts-json-schema-generator').Config} */
        const cc = {
            path: inf,
            type: "*",
            expose: "export",
            schemaId: out,
            topRef: true,
            encodeRefs: true
        };
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

                /** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
                const cc = {
                    path: inf,
                    type: "*",
                    expose: "export",
                    schemaId: out,
                    topRef: true,
                    encodeRefs: true
                };

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

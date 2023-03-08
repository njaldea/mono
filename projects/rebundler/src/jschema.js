// @ts-check

import {
    ts,
    SchemaGenerator,
    createProgram,
    createParser,
    createFormatter,
    BaseType
} from "ts-json-schema-generator";

import { join, basename } from "path";
import { readdirSync, writeFileSync, mkdirSync, existsSync } from "fs";

/**
 *  @typedef {import("ts-json-schema-generator").SubNodeParser} SubNodeParser
 *  @typedef {import("ts-json-schema-generator").SubTypeFormatter} SubTypeFormatter
 */

/**
 * @param {string} filename 
 */
const genID = (filename) => {
    return `${basename(filename, ".d.ts")}.json`;
}

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
     * @param {ts.Node} node
     * @returns
     */
    supportsNode(node) {
        return node.getSourceFile().fileName !== this.src;
    }

    /**
     * @param {import("ts-json-schema-generator").ts.Node} node
     * @param {import("ts-json-schema-generator").Context} context
     * @param {import("ts-json-schema-generator").ReferenceType} reference
     * @returns
     */
    createType(node, context, reference) {
        return new NilType(node.getSourceFile().fileName);
    }
}

/**
 * @param {import("../types/config").Config} config - configuration
 */
export const build = async (config) => {
    if (!existsSync(config.out)) {
        mkdirSync(config.out);
    }
    for (const file of readdirSync(config.in)) {
        if (file === "nil.rebundler.config.js") {
            continue;
        }
        if (file.endsWith(".d.ts")) {
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
            const path = join(config.out, out);
            writeFileSync(path, JSON.stringify(schema, null, 2), { flag: "w" });
        }
    }
};

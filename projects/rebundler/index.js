#! /usr/bin/env node

// @ts-check

import { chdir } from "process";
import { ArgumentParser } from "argparse";
import { resolve } from "path";

import { build as rollup } from "./src/rollup.js";
import { build as jschema } from "./src/jschema.js";
import { configure } from "./src/parser.js";

const main = async () => {
    if (process.env.INIT_CWD != null) {
        chdir(process.env.INIT_CWD);
    }

    const options = {
        description: "Local JS Rebundler",
        usage: "npx @nil-/rebunder MODE [...OPTIONS]",
        add_help: true
    };
    const parser = new ArgumentParser(options);
    const subparsers = parser.add_subparsers({
        title: "command",
        metavar: "MODE",
        help: "config | inline",
        required: true
    });
    const config = subparsers.add_parser("config", { usage: "npx @nil-/rebunder config DIR" });
    config.add_argument("config", { help: "config file location", type: resolve, metavar: "DIR" });

    const inline = subparsers.add_parser("inline", {
        usage: "npx @nil-/rebunder inline [-i FILE] [-o DIR]"
    });
    inline.add_argument("-i", "--in", {
        help: "input file",
        required: true,
        type: resolve,
        metavar: "FILE"
    });
    inline.add_argument("-o", "--out", {
        help: "output directory",
        required: true,
        type: resolve,
        metavar: "DIR"
    });

    const group = inline.add_mutually_exclusive_group({ required: true });
    group.add_argument("--iife", {
        help: "generate iife with provided export name",
        action: "store"
    });
    group.add_argument("--cjs", { help: "generate commonjs", action: "store_true" });
    group.add_argument("--mjs", { help: "generate esmodule", action: "store_true" });
    group.add_argument("--json", {
        help: "generate json schema for ts files",
        action: "store_true"
    });

    const args = parser.parse_args();
    
    const c = await configure(args)
    const build = c.mode.type === "json" ? jschema : rollup;
    await build(c);
};

main();

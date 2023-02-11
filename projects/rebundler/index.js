#! /usr/bin/env node

import { rollup } from "rollup";
import terser from "@rollup/plugin-terser";

import { resolve } from "path";
import { chdir } from "process";

import { ArgumentParser } from "argparse";

const main = async () => {
    if (process.env.INIT_CWD != null) {
        chdir(process.env.INIT_CWD);
    }

    const options = {
        description: "Local JS Rebundler",
        usage: "npx @nil-/rebunder -i <input/file.js> -o <directory>",
        add_help: true
    };
    const parser = new ArgumentParser(options);
    parser.add_argument("-i", "--in", { help: "input file", required: true, type: resolve });
    parser.add_argument("-o", "--out", { help: "output directory", required: true, type: resolve });
    parser.add_argument("-n", "--name", { help: "export name", required: true });
    parser.add_argument("-t", "--terse", { help: "apply terser", action: "store_true" });
    const args = parser.parse_args();

    const build = await rollup({ input: args.in });

    await build.write({
        file: `${args.out}/index.js`,
        format: "iife",
        name: args.name,
        plugins: args.terse ? [terser()] : []
    });

    build.close();
};

main();

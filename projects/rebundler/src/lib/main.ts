import { chdir } from "process";
import { ArgumentParser } from "argparse";
import { resolve } from "path";

import { build as rollup } from "./rollup";
import { build as jschema } from "./jschema";
import { configure } from "./parser";

import type { Args } from "./types/args";
import type { SubParser, SubArgumentParserOptions } from "argparse";

export const main = async () => {
    if (process.env.INIT_CWD != null) {
        chdir(process.env.INIT_CWD);
    }

    const parser = new ArgumentParser({
        description: "Local JS Rebundler",
        usage: "npx @nil-/rebunder COMMAND [...OPTIONS]"
    });

    {
        const subparsers = parser.add_subparsers({
            title: "command",
            metavar: "COMMAND",
            help: "config | iife | es | cjs | json",
            required: true,
            dest: "mode"
        });
        {
            const config = subparsers.add_parser("config", {
                usage: "npx @nil-/rebunder config DIR"
            });
            config.add_argument("in", {
                help: "config file location",
                type: resolve,
                metavar: "DIR"
            });
        }

        {
            const createParser = (
                subparsers: SubParser,
                command: string,
                options: SubArgumentParserOptions
            ): ArgumentParser => {
                const sub = subparsers.add_parser(command, options);
                sub.add_argument("in", {
                    help: "input directory",
                    type: resolve,
                    metavar: "DIR"
                });
                sub.add_argument("-o", "--out", {
                    help: "output directory",
                    type: resolve,
                    metavar: "DIR"
                });
                sub.add_argument("-f", "--file", {
                    help: "target file",
                    metavar: "FILE"
                });
                return sub;
            };

            const createBundlerParser = (
                subparsers: SubParser,
                command: string
            ): ArgumentParser => {
                const sub = createParser(subparsers, command, {
                    usage: `npx @nil-/rebundler inline ${command} -i DIR [-o DIR] [-f FILE] ...[-p PLUGIN]`
                });
                sub.add_argument("-p", "--plugin", {
                    help: "add supported plugin",
                    default: [],
                    action: "append"
                });
                return sub;
            };

            createBundlerParser(subparsers, "es");
            createBundlerParser(subparsers, "cjs");
            createBundlerParser(subparsers, "iife");
            createParser(subparsers, "json", {
                usage: "npx @nil-/rebundler inline json -i DIR [-o DIR] [-f FILE]"
            });
        }
    }

    const args = parser.parse_args() as Args;
    const build = "json" === args.mode ? jschema : rollup;
    await build(await configure(args));
};

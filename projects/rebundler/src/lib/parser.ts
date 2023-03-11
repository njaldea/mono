import { join, resolve } from "path";

import type { Args } from "./types/args";
import type { Config } from "./types/config";

const bundler = (
    i: string | undefined,
    o: string | undefined,
    t: "es" | "cjs" | "iife",
    f: string | undefined,
    p: string[] | undefined
): Config => {
    return {
        in: resolve(join(i ?? ".")),
        out: resolve(join(o ?? `${i ?? "."}/out`)),
        mode: {
            type: t,
            file: f ?? "index.js",
            plugins: p ?? []
        }
    };
};

const schema = (
    i: string | undefined,
    o: string | undefined,
    t: "json",
    f: string | undefined
): Config => {
    return {
        in: resolve(join(i ?? ".")),
        out: resolve(join(o ?? `${i ?? "."}/out`)),
        mode: {
            type: t,
            file: f
        }
    };
};

export const configure = async (args: Args): Promise<Config> => {
    switch (args.mode) {
        case "config": {
            const configpath = join(args.in, "nil.rebundler.config.js");
            try {
                const { default: m } = await (import(configpath) as Promise<{ default: Config }>);
                const mode = m.mode ?? { type: "es", file: "index.js" };
                switch (mode.type) {
                    case "json":
                        return schema(m.in, m.out, mode.type, mode.file);
                    case "es":
                    case "cjs":
                    case "iife":
                    default:
                        return bundler(m.in, m.out, mode.type, mode.file, mode.plugins);
                }
            } catch (e) {
                throw new Error(`Configuration not found [${configpath}]`);
            }
        }
        case "json": {
            return schema(args.in, args.out, args.mode, args.file);
        }
        case "es":
        case "cjs":
        case "iife":
        default: {
            return bundler(args.in, args.out, args.mode, args.file, args.plugin);
        }
    }
};

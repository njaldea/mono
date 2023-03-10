import { join, resolve } from "path";

/**
 * @param {string | undefined} i
 * @param {string | undefined} o
 * @param {"es" | "cjs" | "iife"} t
 * @param {string | undefined} f
 * @param {string[] | undefined} p
 */
const bundler = (i, o, t, f, p) => {
    return {
        in: resolve(join(i ?? ".")),
        out: resolve(join(o ?? `${i ?? "."}/out`)),
        mode: {
            type: t,
            file: f ?? "index.js",
            // @ts-ignore
            plugins: p ?? []
        }
    };
};

/**
 * @param {string | undefined} i
 * @param {string | undefined} o
 * @param {"json"} t
 * @param {string | undefined} f
 */
const schema = (i, o, t, f) => {
    return {
        in: resolve(join(i ?? ".")),
        out: resolve(join(o ?? `${i ?? "."}/out`)),
        mode: {
            type: t,
            file: f
        }
    };
};

/**
 * @param { import("../types/args").Args} args
 * @returns { Promise<import("../types/config").Config> }
 */
export const configure = async (args) => {
    switch (args.mode) {
        case "config": {
            const configpath = join(args.in, "nil.rebundler.config.js");
            try {
                /** @type { import("../index").Config } */
                const m = (await import(configpath)).default;
                const mode = m.mode ?? { type: "es", file: "index.js" };
                switch (mode.type) {
                    case "es":
                    case "cjs":
                    case "iife":
                        return bundler(m.in, m.out, mode.type, mode.file, mode.plugins);
                    case "json":
                        return schema(m.in, m.out, mode.type, mode.file);
                }
            } catch (e) {
                throw new Error(`Configuration not found [${configpath}]`);
            }
        }
        case "es":
        case "cjs":
        case "iife": {
            return bundler(args.in, args.out, args.mode, args.file, args.plugin);
        }
        case "json": {
            return schema(args.in, args.out, args.mode, args.file);
        }
    }
};

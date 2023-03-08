// @ts-check

import { join, resolve } from "path";

/**
 * @param { import("../types/args").Mode} mode
 * @returns { import("../types/config").Mode }
 */
const mode = (mode) => {
    if (mode.iife != null) {
        return { type: "iife", name: mode.iife, plugins: [] };
    }
    if (mode.cjs === true) {
        return { type: "cjs", plugins: [] };
    }
    if (mode.json === true) {
        return { type: "json" };
    }
    return { type: "es", plugins: [] };
};

/**
 * @param { import("../types/args").Args} args - arguments
 * @returns { Promise<import("../types/config").Config> }
 */
export const configure = async (args) => {
    if (args.config) {
        const m = (await import(join(args.config, "nil.rebundler.config.js"))).default;
        return {
            in: resolve(join(args.config, m.in ?? ".")),
            out: resolve(join(args.config, m.out ?? ".")),
            mode: m.mode ?? { type: "es" }
        };
    } else {
        return {
            in: args.in ?? ".",
            out: args.out ?? ".",
            mode: mode(args)
        };
    }
};
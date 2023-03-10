import { rollup } from "rollup";
import terser from "@rollup/plugin-terser";

import { join, basename, extname } from "path";

/**
 * @param {import("../types/config").Config} config
 */
export const build = async (config) => {
    if ("json" === config.mode.type) {
        return;
    }
    const src = join(config.in, config.mode.file);
    const dst = join(config.out, config.mode.file);
    const build = await rollup({ input: src });

    await build.write({
        file: dst,
        format: config.mode.type,
        name:
            "iife" === config.mode.type
                ? basename(config.mode.file, extname(config.mode.file))
                : undefined,
        plugins: (config.mode.plugins ?? [])
            .map((v) => {
                if ("terser" === v) {
                    return terser();
                }
            })
            .filter(Boolean)
    });

    await build.close();
};

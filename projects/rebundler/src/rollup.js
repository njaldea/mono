// @ts-check

import { rollup } from "rollup";
import terser from "@rollup/plugin-terser";

import { join } from "path";
import { readdirSync } from "fs";

/**
 * @param {import("../types/config").Config} config - configuration
 */
export const build = async (config) => {
    if ("json" === config.mode.type) {
        return;
    }
    for (const file of readdirSync(config.in)) {
        if (file === "nil.rebundler.config.js") {
            continue;
        }
        if (file.endsWith(".js")) {
            const build = await rollup({ input: join(config.in, file) });

            await build.write({
                file: join(config.out, file),
                format: config.mode.type,
                name: config.mode.type === "iife" ? config.mode.name : undefined,
                plugins: (config.mode.plugins ?? [])
                    .map((v) => {
                        if (v === "terser") {
                            return terser;
                        }
                    })
                    .filter(Boolean)
            });

            build.close();
        }
    }
};

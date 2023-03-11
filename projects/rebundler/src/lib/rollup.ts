import { rollup } from "rollup";
import terser from "@rollup/plugin-terser";

import { join, basename, extname } from "path";

import type { Config } from "./types/config";

export const build = async (config: Config) => {
    if (null != config.mode && "json" !== config.mode.type) {
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
                .map((v) => "terser" === v && terser())
                .filter(Boolean)
        });

        await build.close();
    }
};

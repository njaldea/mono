import { rollup } from "rollup";
import terser from "@rollup/plugin-terser";
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";

import { join, basename, extname } from "path";

import type { Config } from "./types/config";

export const build = async (config: Config) => {
    if (null != config.mode && "json" !== config.mode.type) {
        const src = join(config.in, config.mode.file);
        const dst = join(config.out, config.mode.file);
        const build = await rollup({
            input: src,
            plugins: (config.mode.plugins ?? [])
                .map((v) => {
                    if ("svelte" === v) return svelte({
                        emitCss: false,
                        onwarn(warning, handler) {
                            if (warning.code === 'a11y-distracting-elements') return;
                            handler(warning);
                        },
                        compilerOptions: {
                            generate: 'dom',
                            hydratable: true,
                            customElement: false
                        }
                    });
                    if ("resolve") return resolve({ browser: true });
                })
                .filter(Boolean)
            });

        await build.write({
            file: dst,
            format: config.mode.type,
            name:
                "iife" === config.mode.type
                    ? basename(config.mode.file, extname(config.mode.file))
                    : undefined,
            plugins: (config.mode.plugins ?? [])
                .map((v) => { if ("terser" === v) return terser(); })
                .filter(Boolean)
        });

        await build.close();
    }
};

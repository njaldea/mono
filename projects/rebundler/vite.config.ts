import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import type { Plugin } from "rollup";

// @ts-expect-error
import shebang from "rollup-plugin-preserve-shebang";

import { dependencies } from "./package.json";

const sb = shebang as () => Plugin;

export default defineConfig({
    build: {
        outDir: "package",
        lib: {
            entry: {
                bin: "./src/bin/index.ts",
                lib: "./src/lib/index.ts"
            },
            formats: ["es"],
            fileName: (format, entry) => `${entry}/index.js`
        },
        target: "node16.15.0",
        rollupOptions: {
            external: [...Object.keys(dependencies), "fs", "fs/promises", "path", "process"],
            plugins: [sb()]
        }
    },
    plugins: [dts()]
});

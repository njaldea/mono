import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import { mdsvex } from "mdsvex";
import admonitions from "remark-admonitions";

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: [
        mdsvex({
            remarkPlugins: [admonitions]
        }),
        vitePreprocess({ script: true }),
    ],
    extensions: [".svelte", ".svx"],
    kit: {
        adapter: adapter({ runtime: "edge" }),
        files: {
            assets: "src/static"
        }
    },
    compilerOptions: { runes: true }
};

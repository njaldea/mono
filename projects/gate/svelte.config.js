import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import { mdsvex } from "mdsvex";

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: [mdsvex(), vitePreprocess({ script: true })],
    extensions: [".svelte", ".mdsvelte", ".svx"],
    kit: {
        adapter: adapter({ runtime: "edge" }),
        files: {
            assets: "src/static"
        }
    },
    compilerOptions: { runes: true }
};

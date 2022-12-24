import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-vercel";

import { mdsvex } from "mdsvex";

/** @type {import("@sveltejs/kit").Config | import("@sveltejs/package").Config} */
export default {
    preprocess: [vitePreprocess(), mdsvex({ extensions: ["+page.svelte", "+page.mdsvelte"] })],
    extensions: [".svelte", ".mdsvelte"],
    kit: {
        adapter: adapter({ edge: true }),
        files: {
            assets: "src/static"
        }
    },
    package: {
        exports: (filepath) => "index.ts" === filepath
    }
};

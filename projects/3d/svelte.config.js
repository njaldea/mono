import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-vercel";

import { mdsvex } from "mdsvex";

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: [vitePreprocess(), mdsvex({ extensions: ["+page.svelte", "+page.mdsvelte"] })],
    extensions: [".svelte", ".mdsvelte"],
    kit: {
        adapter: adapter(),
        files: {
            assets: "src/static"
        }
    }
};

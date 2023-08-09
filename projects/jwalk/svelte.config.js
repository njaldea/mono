import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-vercel";

import { mdsvex } from "mdsvex";

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: [vitePreprocess(), mdsvex({ extensions: [".md"] })],
    extensions: [".svelte", ".md"],
    kit: {
        adapter: adapter({ runtime: "edge" }),
        files: {
            assets: "src/static"
        }
    }
};

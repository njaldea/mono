import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-vercel";

import { mdsvex } from "mdsvex";
import admonitions from "remark-admonitions";

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: [
        vitePreprocess(),
        mdsvex({
            extensions: ["+page.mdsvelte"],
            remarkPlugins: [admonitions]
        })
    ],
    extensions: [".svelte", ".mdsvelte"],
    kit: {
        adapter: adapter({ runtime: "edge" }),
        files: {
            assets: "src/static"
        }
    }
};

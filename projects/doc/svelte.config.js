import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";

import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/package').Config} */
export default {
    preprocess: [
        preprocess(),
        mdsvex({
            extensions: ["+page.svelte"]
        })
    ],
    kit: {
        adapter: adapter()
    },
    package: {
        exports: (filepath) => filepath === "index.ts"
    }
};

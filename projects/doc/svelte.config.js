import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";

import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config | import('@sveltejs/package').Config} */
export default {
    preprocess: [
        preprocess(),
        mdsvex({
            extensions: ["+page.svelte"]
        })
    ],
    kit: {
        adapter: adapter(),
        files: {
            assets: "src/static"
        }
    },
    package: {
        exports: (filepath) => filepath === "index.ts"
    }
};

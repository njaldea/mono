import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/package').Config} */
export default {
    preprocess: preprocess(),
    kit: {
        adapter: adapter()
    },
    package: {
        exports: (filepath) => filepath === "index.ts"
    }
};

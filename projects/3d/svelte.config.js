import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
export default {
    preprocess: [preprocess()],
    kit: {
        adapter: adapter(),
        files: {
            assets: "src/static"
        }
    }
};

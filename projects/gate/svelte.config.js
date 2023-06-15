import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-vercel";

import { mdsvex } from "mdsvex";

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: [vitePreprocess(), mdsvex({ extensions: ["+page.mdsvelte"] })],
    extensions: [".svelte", ".mdsvelte"],
    kit: {
        adapter: adapter({ runtime: "edge" }),
        files: {
            assets: "src/static"
        },
        typescript: {
            config: (c) => {
                const nc = { ...c };
                nc["include"] = [...c["include"], "../src/**/*.mdsvelte"];
                return nc;
            }
        }
    }
};

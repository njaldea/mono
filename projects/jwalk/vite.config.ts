import { sveltekit } from "@sveltejs/kit/vite";
import { version } from "./package.json";

/** @type {import('vite').UserConfig} */
export default {
    plugins: [sveltekit()],
    test: {
        include: ["src/lib/**/*.test.ts"]
    },
    define: {
        __VERSION__: `"${version}"`
    }
};

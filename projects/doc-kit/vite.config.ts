import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
export default {
    plugins: [sveltekit()],
    test: {
        include: ["src/lib/**/*.test.ts"]
    }
};

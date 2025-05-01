import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { version } from "./package.json";

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [sveltekit()],
    define: {
        __VERSION__: `"(v${version})"`
    }
});

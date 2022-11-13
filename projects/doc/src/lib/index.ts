export function loader(files_from_import_meta: Record<string, unknown>) {
    return function () {
        const prefix = ".".length;
        const suffix = "/+page.svelte".length;
        const rootlen = "./+page.svelte".length;
        const routes = Object.keys(files_from_import_meta)
            .filter((p) => p.length > rootlen) // remove root page
            .map((p) => p.substring(prefix, p.length - suffix));
        return { routes };
    };
}

export type { Data } from "$lib/types/data";
export type { Props } from "$lib/types/controls";
export type { Events } from "$lib/types/controls";

export { default as Layout } from "$lib/Layout.svelte";
export { default as Story } from "$lib/meta/Story.svelte";
export { default as Controls } from "$lib/meta/Controls.svelte";
export { default as Template } from "$lib/meta/Template.svelte";

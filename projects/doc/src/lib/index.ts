export function load() {
    const routes = Object.keys(import.meta.glob('/**/+page.svelte', { eager: true }))
        // '/src/routes' == 11
        // '/+page.svelte' == 13
        .filter((p) => p.length > 11 + 13)
        .map((p) => p.substring(11, p.length - 13));
    return { routes };
}

export type { Data } from '$lib/types/data';
export { default as Layout } from '$lib/Layout.svelte';

export type { Events, Props } from '$lib/types/controls';
export { default as Controls } from '$lib/meta/Controls.svelte';

export { default as Story } from '$lib/meta/Story.svelte';
export { default as Template } from '$lib/meta/Template.svelte';

export type Data = { routes: string[] };

export function load() {
    const routes = Object.keys(import.meta.glob('/**/+page.svelte', { eager: true }))
        // '/src/routes' == 11
        // '/+page.svelte' == 13
        .filter((p) => p.length > 11 + 13)
        .map((p) => p.substring(11, p.length - 13));
    return { routes };
}

export { default as Layout } from './Layout.svelte';

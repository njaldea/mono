export type Data = { routes: string[] };

export function load() {
	const routes = Object.keys(import.meta.glob('/**/+page.svelte', { eager: true }))
		// '/src/routes' == 11
		// '+page.svelte' == 12
		.map(p => p.substring(11, p.length - 12));
	return { routes };
}

export { default as Layout } from './Layout.svelte';

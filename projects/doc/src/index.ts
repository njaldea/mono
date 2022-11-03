export interface Tree {
	[key: string]: Tree | string;
}

export function load(): Tree {
	const modules = Object.keys(import.meta.glob('/**/+page.svelte', { eager: true }));

	function iterate(paths: string[]) {
		const retval: Tree = {};

		for (const path of paths) {
			// remove /src/routes
			// maybe take this from configuration
			const parts = path.split('/').splice(3);
			parts.pop();
			if (parts.length == 0) {
				continue;
			}
			let p = retval;
			for (const part of parts) {
				if (!p[part]) {
					p[part] = {};
				}
				p = p[part] as Tree;
			}
			p['__story'] = `/${parts.join('/')}`;
		}
		return retval;
	}

	return iterate(modules);
}

export { default as Layout } from './Layout.svelte';

import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/package').Config} */
export default {
	preprocess: preprocess(),
	package: {
		emitTypes: true,
		source: 'src'
	}
};


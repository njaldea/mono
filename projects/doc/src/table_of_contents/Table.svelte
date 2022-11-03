<script lang="ts">
	import Content from './Content.svelte';
	import type { Tree } from '..';

	export let data: Tree;
	export let selected: string;

	function asTree(v: string | Tree) {
		return v as Tree;
	}
</script>

{#each Object.entries(data) as [key, value]}
	<Content {key} value={asTree(value)} depth={0} {selected} />
{/each}

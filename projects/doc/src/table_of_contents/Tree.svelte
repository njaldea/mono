<script lang="ts">
	import Node from './Node.svelte';
    import type { Tree } from './type'

    export let tree: Tree;
    export let selected: string;

	function asTree(v: string | Tree) {
		return v as Tree;
	}
</script>

{#each Object.entries(tree) as [key, value]}
    <Node {key} value={asTree(value)} depth={0} {selected} />
{/each}

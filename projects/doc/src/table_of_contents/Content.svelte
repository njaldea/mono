<script lang="ts">
	import type { Tree } from '..';

	export let key: string;
	export let value: Tree;
	export let depth: number;
	export let selected: string;

	function asString(v: string | Tree) {
		console.log({
			selected,
			v
		});
		return v as string;
	}
</script>

{#each Object.entries(value) as [k, v]}
	{#if k === '__story'}
		<div class:selected={selected === asString(v)} style={`padding-left: ${depth * 10}px;`}>
			<a href={asString(v)}>{key}</a>
		</div>
	{:else}
		<svelte:self key={k} value={v} depth={depth + 1} {selected} />
	{/if}
{/each}

<style>
	a {
		display: block;
		width: 100%;
		height: 100%;
		color: rgb(201, 205, 207);
		text-decoration: none;
	}

	div {
		width: 100%;
		height: 20px;
	}

	div:hover {
		background-color: rgba(2, 156, 253, 0.07);
	}

	div.selected {
		background-color: rgba(2, 157, 253, 0.822);
	}
</style>

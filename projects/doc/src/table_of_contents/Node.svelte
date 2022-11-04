<script lang="ts">
	import type { Tree } from './type';

	export let key: string;
	export let value: Tree;
	export let depth: number;
	export let selected: string;

	function asString(v: string | Tree) {
		return v as string;
	}

	$: style = `padding-left: ${10 + (depth * 10)}px;`;
</script>

{#if value['__story'] != null}
	{@const link = asString(value['__story'])}
	<div {style} class:selected={selected === link}>
		<a href={link}>{key}</a>
	</div>
{:else}
	<div {style}>
		<span>{key}</span>
	</div>
{/if}

{#each Object.entries(value) as [k, v]}
	{#if k !== '__story'}
		<svelte:self key={k} value={v} depth={depth + 1} {selected} />
	{/if}
{/each}

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 30px;
	}

	div:hover {
		background-color: rgba(2, 156, 253, 0.07);
	}

	div.selected {
		background-color: rgba(2, 157, 253, 0.822);
	}

	span, a {
		display: block;
		user-select: none;
		color: var(--text-color);
		text-decoration: none;
		width: 100%;
	}
</style>

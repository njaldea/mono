<script lang="ts">
	import type { Data } from '.';
	import Table from './table_of_contents/Table.svelte';
	import Divider from './etc/Divider.svelte';

	import { page } from '$app/stores';

	export let data: Data;
	$: url = `${$page.routeId as string}/`;

	let toc_offset = 240;

	let width: number;
	let height: number;
</script>

<div class="root" bind:clientHeight={height} bind:clientWidth={width}>
	{#if width != null && height != null}
		<div class="panel" style={`right: ${width - toc_offset - 20}px;`}>
			<Table info={data.routes} selected={url} />
		</div>
		<div class="content" style={`left: ${toc_offset}px;`}>
			<slot name="content" />
		</div>
		<Divider
			--margin-left={'-10px'}
			--width={'10px'}
			--height={'100%'}
			bind:offset_x={toc_offset}
			min_offset_x={250}
			max_offset_x={width - 250}
			translate_x
		/>
	{/if}
</div>

<style>
	.root {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: rgb(34, 36, 37);
		--text-color: rgb(201, 205, 207);
	}

	div > div {
		position: absolute;
		inset: 0;
	}

	.panel {
		padding-right: 20px;
	}

	.content {
		border-radius: 20px;
		padding: 20px;
		background-color: rgb(27, 28, 29);
	}
</style>

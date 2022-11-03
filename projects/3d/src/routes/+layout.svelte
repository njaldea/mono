<script lang="ts">
	import { type Tree, Layout } from '@nil-/doc';
	export let data: Tree;
</script>

<Layout {data}>
	<svelte:fragment slot="content">
		<slot />
	</svelte:fragment>
</Layout>

<script lang="ts">
    import Node from './Node.svelte';
    import type { Tree, States } from './type';

    export let tree: Record<string, Tree>;
    export let states: Record<string, States>;

    export let force_expand: boolean;
    export let selected: string;
</script>

{#each Object.entries(tree) as [key, value] (key)}
    <Node {key} {value} depth={0} {selected} {force_expand} bind:states={states[key]} />
{/each}

<script lang="ts">
    import Node from "$lib/layout/navigation/Node.svelte";
    import { sort } from "$lib/layout/navigation/utils";
    import type { Tree, States } from "$lib/layout/navigation/types";

    export let tree: Record<string, Tree>;
    export let states: Record<string, States>;

    export let force_expand: boolean;
    export let selected: string;
</script>

{#each sort(tree) as [key, value] (key)}
    <Node {key} {value} depth={0} {selected} {force_expand} bind:states={states[key]} />
{/each}

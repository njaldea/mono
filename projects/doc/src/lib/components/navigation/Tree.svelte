<script lang="ts">
    import Node from "./Node.svelte";
    import { sort } from "./utils";
    import type { Tree, States } from "./types";

    export let tree: Record<string, Tree>;
    export let states: Record<string, States>;

    export let force_expand: boolean;
    export let selected: string;
</script>

{#each sort(tree) as [key, value] (key)}
    <Node {key} {value} depth={1} {selected} {force_expand} bind:states={states[key]} on:navigate />
{/each}

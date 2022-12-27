<script lang="ts">
    import Node from "./Node.svelte";
    import type { Tree, States, Sorter, Renamer } from "./types";
    import { sort } from "./utils";

    export let tree: Record<string, Tree>;
    export let states: Record<string, States>;
    export let sorter: Sorter;
    export let renamer: Renamer;

    export let expand: boolean;
    export let selected: string;
</script>

{#each sort(tree, sorter) as [key, value] (key)}
    <Node
        {key}
        {value}
        depth={0}
        {selected}
        {sorter}
        {renamer}
        {expand}
        bind:states={states[key]}
        on:navigate
    />
{/each}

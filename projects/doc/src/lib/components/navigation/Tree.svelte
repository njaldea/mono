<script lang="ts">
    import Node from "./Node.svelte";
    import type { Tree, States, Sorter, Renamer } from "./types";
    import { sort } from "./utils/sort";

    let {
        tree,
        states = $bindable(),
        sorter,
        renamer,
        expand,
        selected,
        onnavigate
    }: {
        tree: Record<string, Tree>;
        states: Record<string, States>;
        sorter: Sorter;
        renamer: Renamer;
        expand: boolean;
        selected: string;
        onnavigate?: (e: { detail?: string }) => void;
    } = $props();
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
        {onnavigate}
    />
{/each}

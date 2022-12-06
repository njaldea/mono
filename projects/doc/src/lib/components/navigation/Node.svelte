<script lang="ts">
    import { slide } from "svelte/transition";
    import { sort } from "./utils";
    import { createEventDispatcher } from "svelte";
    import type { Tree, States, Sorter, Renamer } from "./types";

    export let key: string;
    export let value: Tree;
    export let depth: number;
    export let selected: string;

    export let force_expand: boolean;
    export let states: States;

    export let sorter: Sorter;
    export let renamer: Renamer;

    const dispatch = createEventDispatcher();

    $: style = `padding-left: ${10 + depth * 10}px;`;
    $: has_children = Object.keys(value.sub).length > 0;

    function click(link: string | null) {
        if (link != null && selected !== link) {
            dispatch("navigate", link);
        } else if (has_children) {
            states.expanded = !states.expanded;
        }
    }
</script>

<div class="wrapper">
    <div
        class="header"
        on:click={() => click(value.url)}
        on:keypress={null}
        {style}
        class:selected={selected === value.url}
    >
        <div class="icon" class:expanded={has_children && states.expanded}>
            <div>
                {#if Object.keys(value.sub).length > 0}
                    >
                {:else}
                    -
                {/if}
            </div>
        </div>
        <span>{renamer(key)}</span>
    </div>
    {#if force_expand || states.expanded}
        <div class="sub" transition:slide|local>
            {#each sort(value.sub, sorter) as [k, v] (k)}
                <svelte:self
                    key={k}
                    value={v}
                    depth={depth + 1}
                    {selected}
                    {renamer}
                    {sorter}
                    {force_expand}
                    bind:states={states.sub[k]}
                    on:navigate
                />
            {/each}
        </div>
    {/if}
</div>

<style>
    .wrapper {
        user-select: none;
    }

    .wrapper,
    .sub,
    .icon {
        display: flex;
        flex-direction: column;
    }

    .header {
        height: 30px;
        display: grid;
        grid-template-columns: 15px 1fr;
        align-items: center;
        cursor: pointer;
    }

    .header:hover {
        background-color: rgba(2, 156, 253, 0.07);
    }

    .header.selected {
        background-color: rgba(2, 157, 253, 0.822);
        color: black;
    }

    .icon {
        justify-content: center;
        height: 15px;
        width: 15px;
    }

    .icon.expanded {
        transform: rotate(90deg);
    }

    .icon > div {
        margin: auto;
    }
</style>

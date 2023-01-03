<script lang="ts">
    import { slide } from "svelte/transition";
    import { sort } from "./utils/sort";
    import { createEventDispatcher } from "svelte";
    import type { Tree, States, Sorter, Renamer } from "./types";

    export let key: string;
    export let value: Tree;
    export let depth: number;
    export let selected: string;

    export let expand: boolean;
    export let states: States;

    export let sorter: Sorter;
    export let renamer: Renamer;

    const dispatch = createEventDispatcher();

    $: style = `padding-left: ${10 + depth * 10}px;`;
    $: hasChildren = Object.keys(value.sub).length > 0;

    const click = (link: string | null) => {
        if (link != null && selected !== link) {
            dispatch("navigate", link);
        } else if (hasChildren) {
            states.expanded = !states.expanded;
        }
    };
</script>

<div class="wrapper">
    <div
        class="header"
        on:click={() => click(value.url)}
        on:keypress={null}
        {style}
        class:selected={selected === value.url}
    >
        <div class="icon" class:expanded={hasChildren && (expand || states.expanded)}>
            <div>{Object.keys(value.sub).length > 0 ? ">" : "-"}</div>
        </div>
        <span>{renamer(key)}</span>
    </div>
    {#if expand || states.expanded}
        <div class="sub" transition:slide|local>
            {#each sort(value.sub, sorter) as [k, v] (k)}
                <svelte:self
                    key={k}
                    value={v}
                    depth={depth + 1}
                    {selected}
                    {renamer}
                    {sorter}
                    {expand}
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
        gap: 5px;
        box-sizing: border-box;
    }

    .header:hover {
        background-color: hsla(203, 98%, 50%, 0.07);
    }

    .header.selected {
        background-color: hsla(203, 98%, 50%, 0.822);
        color: black;
    }

    .icon {
        justify-content: center;
        height: 15px;
        width: 15px;
        transition: transform 350ms;
    }

    .icon.expanded {
        transform: rotate(90deg);
    }

    .icon > div {
        margin: auto;
    }
</style>

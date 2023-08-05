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

    const dispatch = createEventDispatcher<{ navigate: string }>();

    $: style = `padding-left: ${0.5 + depth}rem; padding-right: 0.5rem`;
    $: hasChildren = Object.keys(value.sub).length > 0;

    const click = (link: string | null) => {
        if (link != null && selected !== link) {
            dispatch("navigate", link);
            if (hasChildren && !states.expanded) {
                states.expanded = true;
            }
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
        role="none"
        {style}
        class:selected={selected === value.url}
        class:paged={value.url != null}
    >
        <div class="icon" class:expanded={hasChildren && (expand || states.expanded)}>
            <div>{Object.keys(value.sub).length > 0 ? ">" : "-"}</div>
        </div>
        <span>{renamer(key)}</span>
    </div>
    {#if expand || states.expanded}
        <div class="sub" in:slide out:slide>
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
        height: 1.75rem;
        display: grid;
        grid-template-columns: 1rem 1fr;
        align-items: center;
        cursor: pointer;
        gap: 0.25rem;
        white-space: nowrap;
        padding-right: 0.5rem;
    }

    .header:hover {
        background-color: var(--i-nil-doc-nav-hovered);
    }

    .header.paged:hover {
        background-color: var(--i-nil-doc-nav-page-hovered);
    }

    .header.selected,
    .header.selected:hover {
        background-color: var(--i-nil-doc-nav-selected) !important;
    }

    .icon {
        justify-content: center;
        height: 1rem;
        width: 1rem;
        transition: transform var(--i-nil-doc-transition-time);
    }

    .icon.expanded {
        transform: rotate(90deg);
    }

    .icon > div {
        margin: auto;
    }
</style>

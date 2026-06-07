<script lang="ts">
    import { slide } from "svelte/transition";
    import { sort } from "./utils/sort";
    import type { Tree, States, Sorter, Renamer } from "./types";

    import Node from "./Node.svelte";

    let {
        key,
        value,
        depth,
        selected,
        expand,
        states = $bindable(),
        sorter,
        renamer,
        onnavigate
    }: {
        key: string;
        value: Tree;
        depth: number;
        selected: string;
        expand: boolean;
        states: States;
        sorter: Sorter;
        renamer: Renamer;
        onnavigate?: (v: { detail?: string }) => void;
    } = $props();

    let style = $derived(`padding-left: ${0.5 + depth}rem; padding-right: 0.5rem`);
    let hasChildren = $derived(Object.keys(value.sub).length > 0);

    const onclick = () => {
        if (value.url != null && selected !== value.url) {
            onnavigate?.({ detail: value.url });
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
        {onclick}
        onkeypress={null}
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
        <div class="sub" transition:slide>
            {#each sort(value.sub, sorter) as [k, v] (k)}
                <Node
                    key={k}
                    value={v}
                    depth={depth + 1}
                    {selected}
                    {renamer}
                    {sorter}
                    {expand}
                    bind:states={states.sub[k]}
                    {onnavigate}
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

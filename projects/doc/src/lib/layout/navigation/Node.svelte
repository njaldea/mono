<script lang="ts">
    import { goto } from '$app/navigation';
    import { slide } from 'svelte/transition';
    import type { Tree, States } from './types';

    export let key: string;
    export let value: Tree;
    export let depth: number;
    export let selected: string;

    export let force_expand: boolean;
    export let states: States;

    function click(link: string | null) {
        if (link != null && selected !== link) {
            goto(link);
        } else {
            states.expanded = !states.expanded;
        }
    }

    $: style = `padding-left: ${10 + depth * 10}px;`;
</script>

<div class="wrapper">
    <div
        class="header"
        on:click={() => click(value.url)}
        on:keypress={null}
        {style}
        class:selected={selected === value.url}
    >
        <span>{key}</span>
    </div>
    {#if force_expand || states.expanded}
        <div transition:slide|local>
            {#each Object.entries(value.sub) as [k, v] (k)}
                <svelte:self
                    key={k}
                    value={v}
                    depth={depth + 1}
                    {selected}
                    {force_expand}
                    bind:states={states.sub[k]}
                />
            {/each}
        </div>
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
    }

    .header {
        justify-content: center;
        height: 30px;
    }

    .header:hover {
        background-color: rgba(2, 156, 253, 0.07);
    }

    .header.selected {
        background-color: rgba(2, 157, 253, 0.822);
    }

    span {
        display: block;
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        width: 100%;
    }
</style>

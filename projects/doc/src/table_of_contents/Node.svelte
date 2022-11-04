<script lang="ts">
    import { goto } from '$app/navigation';
    import { slide } from 'svelte/transition';
    import type { Tree } from './type';

    export let key: string;
    export let value: Tree;
    export let depth: number;
    export let selected: string;

    let expanded = false;

    function click(link: string | null) {
        if (link != null && selected !== link) {
            goto(link);
            return;
        }
        expanded = !expanded;
    }

    $: link = value['__link'] as string | null;
    $: style = `padding-left: ${10 + depth * 10}px;`;
</script>

<div class="wrapper">
    <div
        class="header"
        on:click={() => click(link)}
        on:keypress={null}
        {style}
        class:selected={selected === link}
    >
        <span>{key}</span>
    </div>
    {#if expanded}
        <div transition:slide>
            {#each Object.entries(value) as [k, v]}
                {#if k !== '__link'}
                    <svelte:self key={k} value={v} depth={depth + 1} {selected} />
                {/if}
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
        color: var(--text-color);
        text-decoration: none;
        width: 100%;
    }
</style>

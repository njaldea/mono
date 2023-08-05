<script lang="ts">
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    import type { Context } from "../actions/types";

    export let value: readonly [number, number];
    export let context: Context;

    let vx = value[0];
    let vy = value[1];
    let mounted = false;
    const visible = context.state.expand;

    const notify = (path: string, value: number) => {
        mounted && context.notify(path, value);
    };

    $: notify("/0", vx);
    $: notify("/1", vy);
    onMount(() => (mounted = true));
</script>

<div class="wrapper">
    <div class="title" on:click={() => visible.update((v) => !v)} on:keypress={null} role="none">
        Point - {context.key}
    </div>
    {#if $visible}
        <div class="content" in:slide out:slide>
            <span>X</span><input type="number" bind:value={vx} />
            <span>Y</span><input type="number" bind:value={vy} />
        </div>
    {/if}
</div>

<style>
    .wrapper {
        width: 100%;
        user-select: none;
        outline: blue solid 1px;
        box-sizing: border-box;
    }

    .title {
        padding-left: 5px;
        cursor: pointer;
    }

    input {
        width: 100%;
        padding-left: 10px;
        box-sizing: border-box;
    }

    .content {
        gap: 5px;
        height: 65px;
        margin: 0px;
        padding: 5px;
        display: grid;
        place-items: center;
        grid-template-columns: 20px auto;
    }
</style>

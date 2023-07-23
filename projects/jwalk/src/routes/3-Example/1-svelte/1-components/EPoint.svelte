<script lang="ts">
    import { onMount } from "svelte";
    import type { Context } from "../2-actions/types";
    export let value: readonly [number, number];
    export let context: Context;

    let vx = value[0];
    let vy = value[1];
    let mounted = false;

    const notify = (path: string, value: number) => {
        mounted && context.notify(path, value);
    };

    $: notify("/0", vx);
    $: notify("/1", vy);
    onMount(() => (mounted = true));
</script>

<div class="wrapper">
    <div class="title">Point - {context.key}</div>
    <div class="content">
        <span>X</span><input type="number" bind:value={vx} />
        <span>Y</span><input type="number" bind:value={vy} />
    </div>
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
    }

    input {
        width: 100%;
        padding-left: 10px;
        box-sizing: border-box;
    }

    .content {
        gap: 5px;
        padding: 5px;
        display: grid;
        place-items: center;
        grid-template-columns: 20px auto;
    }
</style>

<script lang="ts">
    import type { Context } from "../2-actions/types";
    export let value: readonly [number, number] | undefined;
    export let context: Context;

    let vx = value?.[0] ?? 0;
    let vy = value?.[1] ?? 0;

    $: context.notify("/0", vx);
    $: context.notify("/1", vy);
</script>

<div class="wrapper">
    <div class="title">Point - {context.key}</div>
    <div class="content">
        <span>X</span><input type="number" bind:value={vx} />
    </div>
    <div class="content">
        <span>Y</span><input type="number" bind:value={vy} />
    </div>
</div>

<style>
    .wrapper {
        width: 100%;
        outline: blue solid 1px;
    }

    .title {
        padding: 0px 5px;
        user-select: none;
    }

    input {
        width: 100%;
        box-sizing: border-box;
    }

    .content {
        display: grid;
        grid-template-columns: 20px auto;
        place-items: center;
    }
</style>

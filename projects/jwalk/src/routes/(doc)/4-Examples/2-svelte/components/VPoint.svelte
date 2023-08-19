<script lang="ts">
    import { slide } from "svelte/transition";
    import type { Context } from "../actions/types";

    export let value: readonly [number, number];
    export let detail: Context["detail"];

    const visible = detail.state.expand;
</script>

<div class="wrapper">
    <div class="title" on:click={() => visible.update((v) => !v)} on:keypress={null} role="none">
        Point - {detail?.key}
    </div>
    {#if $visible}
        <pre class="content" in:slide out:slide>{JSON.stringify(value)}</pre>
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

    .content {
        gap: 5px;
        height: 65px;
        margin: 0px;
        padding: 5px;
    }
</style>

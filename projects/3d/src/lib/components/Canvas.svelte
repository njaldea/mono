<script lang="ts">
    import { Core } from "$lib/core/types/Core";
    import Context from "$lib/components/Context.svelte";
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;

    let width: number;
    let height: number;

    let core: Core | null = null;
    onMount(() => (core = new Core(canvas, false)));

    $: height, width, core && core.resize();
</script>

<canvas bind:this={canvas} bind:clientHeight={height} bind:clientWidth={width}>
    {#if core}
        <Context {core}>
            <slot />
        </Context>
    {/if}
</canvas>

<style>
    canvas {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: block;
        outline: none;
        user-select: none;
    }
</style>

<script lang="ts">
    import { Core } from "$lib/core/types/Core";
    import Context from "$lib/components/Context.svelte";
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;

    let width: number | null = null;
    let height: number | null = null;

    let core: Core | null = null;
    onMount(() => (core = new Core(canvas, false)));

    function resize(h: number | null, w: number | null) {
        if (w != null && h != null && core != null) {
            core.resize();
            core.render();
        }
    }

    $: resize(height, width);
</script>

<div bind:clientHeight={height} bind:clientWidth={width}>
    <canvas bind:this={canvas}>
        {#if core}
            <Context {core}>
                <slot />
            </Context>
        {/if}
    </canvas>
</div>

<style>
    * {
        width: 100%;
        height: 100%;
    }

    canvas {
        box-sizing: border-box;
        display: block;
        outline: none;
        user-select: none;
    }
</style>

<script lang="ts">
    import { Core } from "$lib/core/types/Core";
    import Context from "$lib/components/Context.svelte";
    import { onMount, type Snippet } from "svelte";

    let {
        canvas,
        width,
        height,
        core,
        children
    }: {
        canvas?: HTMLCanvasElement;
        width?: number;
        height?: number;
        core?: Core;
        children?: Snippet;
    } = $props();

    onMount(() => {
        core = new Core(canvas!, false);
        core.renderLoopStart();
        return () => core!.renderLoopStop();
    });

    const resize = (h: number | null, w: number | null) => {
        if (w != null && h != null && core != null) {
            core.resize();
            core.render();
        }
    };

    $effect(() => {
        resize(height!, width!);
    });
</script>

<div bind:clientHeight={height} bind:clientWidth={width}>
    <canvas bind:this={canvas} onwheel={(e) => e.preventDefault()}>
        {#if core}
            <Context {core}>
                {@render children?.()}
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

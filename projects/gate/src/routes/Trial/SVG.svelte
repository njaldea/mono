<script lang="ts">
    import Context from "./Context.svelte";
    let svg: SVGSVGElement;
</script>

<svg bind:this={svg} viewBox="-50 -50 100 100">
    {#if svg}
        <Context {svg}>
            <slot />
        </Context>
    {/if}
</svg>

<style>
    svg {
        width: 100%;
        height: 100%;
        background-color: black;
        outline: white solid 1px;
        stroke: white;
        stroke-width: 5;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
        user-select: none;
        touch-action: none;
    }
</style>

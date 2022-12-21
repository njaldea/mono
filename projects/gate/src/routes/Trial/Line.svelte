<script lang="ts">
    import Circle from "./Circle.svelte";

    export let x1 = 0;
    export let y1 = 0;
    export let x2 = 0;
    export let y2 = 0;

    let show = false;
    let moving = false;
</script>

<svelte:window on:pointerup={() => (moving = false)} />

<g
    on:pointerenter={() => (show = true)}
    on:pointerout={() => (show = false)}
    on:pointerdown={() => (moving = true)}
    class:show={show || moving}
>
    <line {x1} {y1} {x2} {y2} />
    <Circle bind:x={x1} bind:y={y1} />
    <Circle bind:x={x2} bind:y={y2} />
</g>

<style>
    line {
        fill: white;
        stroke-width: 1px;
    }

    g:not(.show) > :global(circle) {
        fill: transparent;
        stroke-width: 0px;
    }
</style>

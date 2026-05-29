<script lang="ts">
    import Circle from "./Circle.svelte";

    let {
        x1 = $bindable(0),
        y1 = $bindable(0),
        x2 = $bindable(0),
        y2 = $bindable(0),
        movable = false
    } = $props();

    let show = $state(false);
    let moving = $state(false);
</script>

<svelte:window onpointerup={() => (moving = false)} />

{#if movable}
    <g
        onpointerenter={() => (show = true)}
        onpointerout={() => (show = false)}
        onpointerdown={() => (moving = true)}
        class:show={show || moving}
    >
        <line {x1} {y1} {x2} {y2} />
        <Circle bind:x={x1} bind:y={y1} draggable />
        <Circle bind:x={x2} bind:y={y2} draggable />
    </g>
{:else}
    <line {x1} {y1} {x2} {y2} />
{/if}

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

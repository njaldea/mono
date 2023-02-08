<script>
    export let title = "";
    export let scale = false;
</script>

<div on:click on:keypress {title} class:scale>
    <slot />
</div>

<style>
    div {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        transition: transform var(--i-nil-doc-transition-time);
    }

    div.scale:hover {
        transform: scale(1.5);
    }

    div > :global(svg) {
        width: 100%;
        height: 100%;
        stroke-width: 3;
        stroke: currentColor;
        fill: currentColor;
    }
</style>

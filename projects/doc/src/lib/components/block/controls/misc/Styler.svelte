<script lang="ts">
    import { getTheme } from "$lib/components/context";
    const dark = getTheme();
</script>

<div class:dark={$dark}>
    <slot />
</div>

<style>
    div {
        width: 100%;
        min-width: 500px;
        overflow: hidden;
        display: grid;
        grid-auto-rows: 30px;
        box-sizing: border-box;
    }

    div :global(*),
    div :global(*::before),
    div :global(*::after) {
        box-sizing: inherit;
    }

    div > :global(div) {
        width: 100%;
        display: grid;
        padding: 2px 0px;
        grid-template-columns: minmax(250px, 1fr) 200px 40px;
    }

    div > :global(div > div:not(:first-child) > *) {
        width: 100%;
        height: 100%;
    }

    /* colors */
    div > :global(div) {
        transition: background-color 350ms;
        background-color: hsl(0, 0%, 100%);
    }

    div > :global(div:nth-child(even)) {
        background-color: hsl(210, 29%, 97%);
    }

    div > :global(div:nth-child(n + 2):hover) {
        background-color: hsl(210, 100%, 90%);
    }

    div > :global(div:hover .tooltip) {
        background-color: hsl(0, 0%, 100%);
        outline: hsl(0, 100%, 0%) 1px solid;
    }

    div.dark > :global(div) {
        background-color: hsl(213, 26%, 7%);
    }

    div.dark > :global(div:nth-child(even)) {
        background-color: hsl(213, 26%, 11%);
    }

    div.dark > :global(div:nth-child(n + 2):hover) {
        background-color: hsl(203, 100%, 15%);
    }

    div.dark > :global(div:hover .tooltip) {
        background-color: hsl(213, 26%, 7%);
        outline: hsl(200, 6%, 80%) 1px solid;
    }
</style>

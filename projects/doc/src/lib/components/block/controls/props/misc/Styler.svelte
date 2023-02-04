<script lang="ts">
    import { getTheme } from "$lib/components/context";
    const dark = getTheme();
</script>

<!--
    <div> this component
        <div> Header
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div> Controls
            <div></div>
            <div></div>
            <div></div>
        </div>
        ...
    </div>
-->
<div class:dark={$dark}>
    <slot />
</div>

<style>
    div {
        display: grid;
        overflow: hidden;
        min-width: 31.25rem;
        grid-auto-rows: 2rem;
        box-sizing: border-box;
    }

    div :global(*),
    div :global(*::before),
    div :global(*::after) {
        box-sizing: inherit;
        font-family: inherit;
    }

    div > :global(div) {
        display: grid;
        grid-template-columns: minmax(15rem, 1fr) 12.5rem 2.5rem;
    }

    div > :global(div:first-child) {
        font-weight: bold;
        place-items: center;
    }

    div > :global(div > div:not(:first-child)) {
        display: grid;
        place-items: center;
    }

    div > :global(div > div:not(:first-child) > *) {
        width: 100%;
        height: 80%;
        font-size: 1rem;
    }

    /* colors */
    div {
        --pri-color: hsl(0, 0%, 100%);
        --sec-color: hsl(210, 29%, 97%);
        --hover-color: hsl(210, 100%, 90%);
        --outline-color: hsl(0, 0%, 0%);
    }

    div.dark {
        --pri-color: hsl(213, 26%, 7%);
        --sec-color: hsl(213, 26%, 11%);
        --hover-color: hsl(203, 100%, 15%);
        --outline-color: hsl(200, 6%, 80%);
    }

    div {
        transition: background-color 350ms;
        background-repeat: repeat;
        background-size: 100% 4rem;
        background-image: linear-gradient(to bottom, var(--pri-color) 2rem, var(--sec-color) 2rem);
    }

    div > :global(div:nth-child(n + 2):hover) {
        background-color: var(--hover-color);
    }

    div > :global(div:hover .tooltip) {
        background-color: var(--pri-color);
        outline: var(--outline-color) 1px solid;
    }
</style>

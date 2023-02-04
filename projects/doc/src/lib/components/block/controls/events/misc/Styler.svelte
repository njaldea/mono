<script lang="ts">
    import { getTheme } from "$lib/components/context";
    const dark = getTheme();
</script>

<!--
    <div> this component
        <div> Header
            <div></div>
            <div></div>
        </div>
        <div> Controls
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
        height: 22rem;
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
        grid-template-columns: 2fr 3fr;
        align-items: center;
    }

    div > :global(div:first-child) {
        font-weight: bold;
        justify-items: center;
    }

    /* colors */
    div {
        --pri-color: hsl(0, 0%, 100%);
        --sec-color: hsl(210, 29%, 97%);
        --hover-color: hsl(210, 100%, 90%);
    }

    div.dark {
        --pri-color: hsl(213, 26%, 7%);
        --sec-color: hsl(213, 26%, 11%);
        --hover-color: hsl(203, 100%, 15%);
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
</style>

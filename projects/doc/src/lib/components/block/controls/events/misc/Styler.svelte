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
        width: 100%;
        height: 330px;
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
        display: grid;
        width: 100%;
        padding: 2px 0px;
        grid-template-columns: 1fr 2fr;
    }

    div > :global(div > div) {
        padding: 0px 10px;
    }

    div > :global(div:first-child) {
        text-align: center;
    }

    div > :global(div:not(:first-child) > div:first-child) {
        display: grid;
        grid-template-columns: 1fr 30px;
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
        transition: background-color 150ms;
        background-repeat: repeat;
        background-size: 100% 60px;
        background-image: linear-gradient(to bottom, var(--pri-color) 30px, var(--sec-color) 30px);
    }

    div > :global(div:nth-child(n + 2):hover) {
        background-color: var(--hover-color);
    }
</style>

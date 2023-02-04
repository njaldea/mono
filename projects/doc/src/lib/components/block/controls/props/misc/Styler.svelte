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
        font-family: inherit;
    }

    div > :global(div) {
        display: grid;
        width: 100%;
        padding: 2px 0px;
        grid-template-columns: minmax(250px, 1fr) 200px 40px;
    }

    div > :global(div:first-child) {
        text-align: center;
        font-weight: bold;
    }

    div > :global(div > div:not(:first-child) > *) {
        width: 100%;
        height: 100%;
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
        background-size: 100% 60px;
        background-image: linear-gradient(to bottom, var(--pri-color) 30px, var(--sec-color) 30px);
    }

    div > :global(div:nth-child(n + 2):hover) {
        background-color: var(--hover-color);
    }

    div > :global(div:hover .tooltip) {
        background-color: var(--pri-color);
        outline: var(--outline-color) 1px solid;
    }
</style>

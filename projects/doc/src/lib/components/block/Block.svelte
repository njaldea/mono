<script lang="ts">
    import {
        initParams,
        initDefaults,
        initControls,
        initControlsState,
        initOrientation
    } from "./context";

    import { getTheme, initTheme, type Theme } from "../context";

    initParams();
    initDefaults();
    initControls();
    initControlsState();

    const columns = initOrientation();

    export let theme: Theme = undefined;

    const parentTheme = getTheme();
    const dark = initTheme();
    $: $dark = theme === undefined ? $parentTheme : "dark" === theme;
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/2-Block) for more details.
-->

<div class:columns={$columns} class:dark={$dark}>
    <slot />
</div>

<style>
    @import url("https://fonts.googleapis.com/css?family=Fira%20Code");

    div {
        display: grid;
        border-radius: 5px;
        grid-auto-rows: 1fr;
        grid-auto-columns: auto;
        grid-auto-flow: row;

        box-sizing: border-box;
        font-family: "Fira Code", "Courier New", Courier, monospace;
        padding: 13px 3px;
        gap: 3px;
    }

    div.columns {
        grid-auto-rows: auto;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
    }

    /* colors */
    div {
        color-scheme: light;
        color: hsl(0, 0%, 0%);
        background-color: hsl(0, 2%, 70%);
        transition: color 350ms, background-color 350ms;
    }

    div.dark {
        color-scheme: dark;
        color: hsl(0, 0%, 80%);
        background-color: hsl(0, 2%, 40%);
    }
</style>

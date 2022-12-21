<script lang="ts">
    import {
        initParams,
        initCurrent,
        initDefaults,
        initControls,
        initControlsState
    } from "./context";

    import { inRoot, getTheme, initTheme, evalTheme, type Theme } from "$lib/components/context";

    initParams();
    initCurrent();
    initDefaults();
    initControls();
    initControlsState();

    const r = inRoot();

    export let theme: Theme = undefined;

    const parentTheme = getTheme();
    const isDark = initTheme();
    $: $isDark = evalTheme(parentTheme ? $parentTheme : false, theme);
</script>

<div class:reset={r} class:dark={$isDark}>
    <slot />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }

    /* reset block */
    @import url("https://fonts.googleapis.com/css?family=Fira%20Code");

    .reset {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }

    /* colors */
    div {
        color-scheme: light;
        color: hsl(0, 100%, 0%);
    }

    div.dark {
        color-scheme: dark;
        color: hsl(200, 6%, 80%);
    }
</style>

<script lang="ts">
    import {
        initParams,
        initCurrent,
        initDefaults,
        initControls,
        initControlsState
    } from "./context";
    import { inRoot } from "../context";

    initParams();
    initCurrent();
    initDefaults();
    initControls();
    initControlsState();

    const r = inRoot();
</script>

<div class:reset={r}>
    <slot />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }

    /* reset block */
    @font-face {
        font-family: "Fira Code";
        src: url("https://fonts.googleapis.com/css?family=Fira Code");
    }

    .reset {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }

    .reset :global(*),
    .reset :global(*::before),
    .reset :global(*::after) {
        box-sizing: inherit;
        padding: 0px;
        margin: 0px;
    }
</style>

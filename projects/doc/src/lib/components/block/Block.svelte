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

<div class:nil-doc-reset={r}>
    <slot />
</div>

<style>
    @import "../../styles/reset.css";

    div {
        display: flex;
        flex-direction: column;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }
</style>

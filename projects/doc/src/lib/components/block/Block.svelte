<script lang="ts">
    import { initCurrent, initParams, initControls, initDefaults } from "./context";
    import { inRoot } from "../context";

    initParams();
    initCurrent();
    initControls();
    initDefaults();

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

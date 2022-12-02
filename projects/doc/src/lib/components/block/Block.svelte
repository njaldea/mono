<script lang="ts">
    import { initCurrent, initParams, initControls } from "./context";
    import "../../styles/root.css";

    initParams();
    initCurrent();
    initControls();
</script>

<div class="root">
    <slot />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }
</style>

<script lang="ts">
    import { initCurrent, initParams, initControls } from "./context";
    initParams();
    initCurrent();
    initControls();
</script>

<div>
    <slot />
</div>

<style>
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>

<script lang="ts">
    import { initCurrent, initParams, initControls } from "./_impl/context";
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
        padding: 10px;
    }
</style>

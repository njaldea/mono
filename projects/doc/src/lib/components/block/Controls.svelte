<script lang="ts">
    import type { Control } from "./controls/types";
    import { getControls, getControlsState } from "./context";

    export let props: Control[] = [];
    export let expand = false;

    const controls = getControls();
    $controls = props;

    const state = getControlsState();
    $: $state.expand = expand;
</script>

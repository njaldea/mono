<script lang="ts">
    import type { Control } from "./controls/types";
    import { getControls, getControlsState } from "./context";

    export let props: Control[] = [];
    export let hide = false;
    export let position: undefined | "bottom" | "right" = undefined;

    const controls = getControls();
    $controls = props;

    const state = getControlsState();
    $: $state.hide = hide;
    $: $state.position = position;
</script>

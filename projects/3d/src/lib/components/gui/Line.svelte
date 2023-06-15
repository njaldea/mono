<script lang="ts">
    import ControlComponent from "$lib/components/gui/Control.svelte";

    import { getCurrentUIContainer } from "$lib/core/context/ui";

    import type { Control } from "@babylonjs/gui/2D/controls/control.js";
    import { Line } from "@babylonjs/gui/2D/controls/line.js";

    const container = getCurrentUIContainer();

    export let connectedControl: undefined | Control = undefined;

    const control = new Line();
    control.lineWidth = 4;
    control.color = "Orange";
    control.y2 = 20;
    control.linkOffsetY = -20;
    // TODO: find better control mapping (relationships between multiple controls)
    $: if (connectedControl != null) {
        control.connectedControl = connectedControl;
    }
</script>

<ControlComponent {container} {control} />

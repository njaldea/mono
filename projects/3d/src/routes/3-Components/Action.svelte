<script lang="ts">
    import { Action, Hover, Highlight } from "$lib/components/action";
    import Line from "$lib/components/gui/Line.svelte";
    import TextBlock from "$lib/components/gui/TextBlock.svelte";
    import Rectangle from "$lib/components/gui/container/Rectangle.svelte";
    import Ellipse from "$lib/components/gui/container/Ellipse.svelte";

    import type { Control } from "@babylonjs/gui/2D/controls/control.js";

    export let text: string;
    export let color: [number, number, number] = [0, 1, 0];

    let rect: undefined | Control = undefined;
</script>

<Action>
    <Hover>
        <Highlight {color} />
        <Rectangle bind:control={rect}>
            <TextBlock {text} />
        </Rectangle>
        <Line connectedControl={rect} />
        <Ellipse />
    </Hover>
</Action>

<script lang="ts">
    import { Action, Hover, Highlight } from "$lib/components/action";
    import Line from "$lib/components/gui/Line.svelte";
    import TextBlock from "$lib/components/gui/TextBlock.svelte";
    import Rectangle from "$lib/components/gui/container/Rectangle.svelte";
    import Ellipse from "$lib/components/gui/container/Ellipse.svelte";

    import type { Control } from "@babylonjs/gui/2D/controls/control.js";

    let {
        text,
        color = [0, 1, 0]
    }: {
        text: string;
        color?: [number, number, number];
    } = $props();

    let rect: undefined | Control = $state();
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

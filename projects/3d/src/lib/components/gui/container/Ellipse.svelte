<script lang="ts">
    import type { Snippet } from "svelte";
    import Container from "./Container.svelte";

    import { Ellipse } from "@babylonjs/gui/2D/controls/ellipse.js";

    let {
        control = new Ellipse(),
        children
    }: {
        control?: Ellipse;
        children?: Snippet
    } = $props();
    control.width = "40px";
    control.height = "40px";
    control.color = "Orange";
    control.thickness = 4;
    control.background = "green";
</script>

<Container container={control}>
    {@render children?.()}
</Container>

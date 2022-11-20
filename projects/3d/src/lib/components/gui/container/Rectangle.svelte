<script lang="ts">
    import Container from "./Container.svelte";

    import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle.js";
    import type { Control } from "@babylonjs/gui/2D/controls/control.js";

    export let control: Control = new Rectangle();
    const rect = control as Rectangle;
    rect.width = 0.2;
    rect.height = "40px";
    rect.cornerRadius = 20;
    rect.color = "Orange";
    rect.thickness = 4;
    rect.background = "green";
    rect.linkOffsetY = -150;
</script>

<Container container={rect}>
    <slot />
</Container>

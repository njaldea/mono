<script lang="ts">
    import Container from "./Container.svelte";

    import { Ellipse } from "@babylonjs/gui/2D/controls/ellipse.js";

    export let control = new Ellipse();
    control.width = "40px";
    control.height = "40px";
    control.color = "Orange";
    control.thickness = 4;
    control.background = "green";
</script>

<Container container={control}>
    <slot />
</Container>

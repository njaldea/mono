<script lang="ts">
    import { destructor } from "$lib/core/lifecycle";

    import type { IContainer } from "$lib/core/types/ContainerProxy";
    import type { Control } from "@babylonjs/gui/2D/controls/control.js";
    import type { Snippet } from "svelte";

    let {
        container,
        control,
        children
    }: {
        container: IContainer;
        control: Control;
        children?: Snippet;
    } = $props();

    container.addControl(control);
    destructor(() => {
        container.removeControl(control);
        control.dispose(); // should this be called?
    });
</script>

{@render children?.()}

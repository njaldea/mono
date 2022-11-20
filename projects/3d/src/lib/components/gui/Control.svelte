<script lang="ts">
    import { destructor } from "$lib/core/lifecycle";

    import type { IContainer } from "$lib/core/types/ContainerProxy";
    import type { Control } from "@babylonjs/gui/2D/controls/control.js";

    export let container: IContainer;
    export let control: Control;

    container.addControl(control);
    destructor(() => {
        container.removeControl(control);
        control.dispose(); // should this be called?
    });
</script>

<slot />

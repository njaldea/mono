<script lang="ts">
    import Control from "$lib/components/gui/Control.svelte";

    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentUIContainer, setCurrentUIContainer } from "$lib/core/context/ui";

    import type { Container } from "@babylonjs/gui/2D/controls/container.js";

    export let container: Container;

    const parent = getCurrentUIContainer();
    setCurrentUIContainer(container);

    parent.addControl(container);
    destructor(() => parent.removeControl(container));
</script>

<Control container={parent} control={container}>
    <slot />
</Control>

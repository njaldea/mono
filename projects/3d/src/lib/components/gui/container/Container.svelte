<script lang="ts">
    import Control from "$lib/components/gui/Control.svelte";

    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentUIContainer, setCurrentUIContainer } from "$lib/core/context/ui";

    import type { Container } from "@babylonjs/gui/2D/controls/container.js";
    import type { Snippet } from "svelte";

    let {
        container,
        children
    }: {
        container:  Container;
        children?: Snippet;
    } = $props();

    const parent = getCurrentUIContainer();
    setCurrentUIContainer(container);

    parent.addControl(container);
    destructor(() => parent.removeControl(container));
</script>

<Control container={parent} control={container}>
    {@render children?.()}
</Control>

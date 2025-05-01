<script lang="ts">
    import Component from "$lib/components/Component.svelte";
    import { setCurrentCanvas } from "$lib/core/context/canvas";
    import { setCore } from "$lib/core/context/core";
    import { destructor } from "$lib/core/lifecycle";
    import type { Core } from "$lib/core/types/Core";
    import type { Snippet } from "svelte";

    let { core, children }: { core: Core; children?: Snippet; } = $props();

    setCore(core);
    setCurrentCanvas(core.canvas);
    destructor(() => core.destroy());
</script>

<Component>
    {@render children?.()}
</Component>

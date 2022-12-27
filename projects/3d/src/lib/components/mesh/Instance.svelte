<script lang="ts">
    import Node from "$lib/components/node/Node.svelte";

    import { getCurrentMesh, setCurrentMesh } from "$lib/core/context/mesh";

    import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";

    const mesh = getCurrentMesh() as Mesh;

    export let id: string;

    export let position: undefined | [number, number, number] = undefined;
    export let rotation: undefined | [number, number, number] = undefined;
    export let scaling: undefined | [number, number, number] = undefined;
    export let disabled: undefined | boolean = undefined;

    export let edgeWidth = 0;
    export let edgeRendering = false;

    const instance = mesh.createInstance(`${mesh.id}-${id}`);
    setCurrentMesh(instance);

    $: instance.edgesWidth = edgeWidth;
    $: edgeRendering ? instance.enableEdgesRendering() : instance.disableEdgesRendering();
    instance.edgesColor.r = 0;
    instance.edgesColor.g = 0;
    instance.edgesColor.b = 0;
</script>

<Node node={instance} {position} {rotation} {scaling} {disabled}>
    <slot />
</Node>

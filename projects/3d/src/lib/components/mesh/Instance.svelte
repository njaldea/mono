<script lang="ts">
    import Node from "$lib/components/node/Node.svelte";

    import { getCurrentMesh, setCurrentMesh } from "$lib/core/context/mesh";

    import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
    import type { Snippet } from "svelte";

    const mesh = getCurrentMesh() as Mesh;

    let {
        id,
        position,
        rotation,
        scaling,
        disabled,
        edgeWidth = 0,
        edgeRendering = false,
        children
    }: {
        id: string;
        position?: [number, number, number];
        rotation?: [number, number, number];
        scaling?: [number, number, number];
        disabled?: boolean;
        edgeWidth?: number;
        edgeRendering?: boolean;
        children?: Snippet
    } = $props();

    const instance = mesh.createInstance(`${mesh.id}-${id}`);
    setCurrentMesh(instance);

    $effect(() => { instance.edgesWidth = edgeWidth; });
    $effect(() => { edgeRendering ? instance.enableEdgesRendering() : instance.disableEdgesRendering(); });
    instance.edgesColor.r = 0;
    instance.edgesColor.g = 0;
    instance.edgesColor.b = 0;
</script>

<Node node={instance} {position} {rotation} {scaling} {disabled}>
    {@render children?.()}
</Node>

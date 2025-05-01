<script lang="ts">
    import { setCurrentMesh } from "$lib/core/context/mesh";

    import Node from "$lib/components/node/Node.svelte";

    import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
    import type { Snippet } from "svelte";

    let {
        mesh,
        position,
        rotation,
        scaling,
        disabled,
        frozen,
        hidden = false,
        edgeWidth = 0,
        edgeRendering = false,
        children
    }: {
        mesh: Mesh;
        position?: [number, number, number];
        rotation?: [number, number, number];
        scaling?: [number, number, number];
        disabled?: boolean;
        frozen?: boolean;
        hidden?: boolean;
        edgeWidth?: number;
        edgeRendering?: boolean;
        children: Snippet;
    } = $props();

    $effect(() => {
        mesh.edgesWidth = edgeWidth;
    });
    $effect(() => {
        edgeRendering ? mesh.enableEdgesRendering() : mesh.disableEdgesRendering();
    });
    $effect(() => {
        mesh.isVisible = !hidden;
    });
    mesh.edgesColor.r = 0;
    mesh.edgesColor.g = 0;
    mesh.edgesColor.b = 0;

    setCurrentMesh(mesh);
</script>

<Node node={mesh} {position} {rotation} {scaling} {disabled} {frozen}>
    {@render children?.()}
</Node>

<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentMesh } from "$lib/core/context/mesh";
    import { getCore } from "$lib/core/context/core";

    import { Color3 } from "@babylonjs/core/Maths/math.color.js";
    import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer.js";
    import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";

    const { scene } = getCore();
    const mesh = getCurrentMesh() as Mesh;

    let {
        id = "hl",
        color = [0, 0, 0]
    }: {
        id?: string;
        color?: [number, number, number];
    } = $props();

    const layer = new HighlightLayer(`${mesh.id}-${id}`, scene);
    $effect(() => {
        layer.removeMesh(mesh);
        layer.addMesh(mesh, new Color3(...color));
    });

    destructor(() => layer.dispose());
</script>

<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentMesh } from "$lib/core/context/mesh";
    import { getCore } from "$lib/core/context/core";

    import { Color3 } from "@babylonjs/core/Maths/math.color.js";
    import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer.js";
    import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";

    const { scene } = getCore();
    const mesh = getCurrentMesh() as Mesh;

    export let id = "hl";
    export let color: [number, number, number] = [0, 0, 0];

    const layer = new HighlightLayer(`${mesh.id}-${id}`, scene);
    $: {
        layer.removeMesh(mesh);
        layer.addMesh(mesh, new Color3(...color));
    }

    destructor(() => layer.dispose());
</script>

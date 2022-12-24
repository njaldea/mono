<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentMesh } from "$lib/core/context/mesh";
    import { getCore } from "$lib/core/context/core";

    import type { Material } from "@babylonjs/core/Materials/material.js";

    export let id: string;

    const { scene } = getCore();
    const mesh = getCurrentMesh();

    $: mesh.material = scene.getMaterialByName(id);

    const materialAdded = (m: Material) => {
        if (m.id === id) {
            mesh.material = m;
        }
    };

    const materialRemoved = (m: Material) => {
        if (m.id === id) {
            mesh.material = null;
        }
    };

    scene.onNewMaterialAddedObservable.add(materialAdded);
    scene.onMaterialRemovedObservable.add(materialRemoved);

    destructor(() => {
        mesh.material = null;
        scene.onNewMaterialAddedObservable.removeCallback(materialAdded);
        scene.onMaterialRemovedObservable.removeCallback(materialRemoved);
    });
</script>

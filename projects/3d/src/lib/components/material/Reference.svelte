<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentMesh } from "$lib/core/context/mesh";
    import { getCore } from "$lib/core/context/core";

    import type { Material } from "@babylonjs/core/Materials/material.js";

    export let id: string;

    const { scene } = getCore();
    const mesh = getCurrentMesh();

    scene.onNewMaterialAddedObservable.add(materialAdded);
    scene.onMaterialRemovedObservable.add(materialRemoved);

    $: mesh.material = scene.getMaterialByName(id);

    function materialAdded(m: Material) {
        if (m.id === id) {
            mesh.material = m;
        }
    }

    function materialRemoved(m: Material) {
        if (m.id === id) {
            mesh.material = null;
        }
    }

    destructor(() => {
        mesh.material = null;
        scene.onNewMaterialAddedObservable.removeCallback(materialAdded);
        scene.onMaterialRemovedObservable.removeCallback(materialRemoved);
    });
</script>

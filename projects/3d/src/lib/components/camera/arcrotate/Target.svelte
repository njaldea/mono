<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentCamera } from "$lib/core/context/camera";
    import { getCore } from "$lib/core/context/core";

    import { tick } from "svelte";

    import type { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
    import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";

    const { scene } = getCore();
    const camera = getCurrentCamera() as ArcRotateCamera;

    export let target = "";

    // Once camera targets a mesh, 3~4 frames are rendered to achieve final result.
    // I think this is due to update in target position does not necessarily update the camera.

    let currentMesh: AbstractMesh | null = null;

    const setTarget = async (mesh: AbstractMesh | null) => {
        if (mesh !== currentMesh) {
            if (mesh) {
                // need to await on next frame to guarantee that
                // mesh is ready when setting the target
                await tick();
                camera.setTarget(mesh);
                camera.update();
            } else if (currentMesh) {
                camera.setTarget(currentMesh.position.clone());
            }
            currentMesh = mesh;
        }
    };

    const unsetTarget = () => {
        if (currentMesh) {
            camera.setTarget(currentMesh.position.clone());
            currentMesh = null;
        }
    };

    $: setTarget(scene.getMeshByName(target));

    type Callback = (mesh: AbstractMesh) => void;

    const onMeshAdded: Callback = (mesh) => mesh.id === target && setTarget(mesh);
    const onMeshRemoved: Callback = (mesh) => mesh.id === target && unsetTarget();

    scene.onNewMeshAddedObservable.add(onMeshAdded);
    scene.onMeshRemovedObservable.add(onMeshRemoved);

    destructor(() => {
        scene.onMeshRemovedObservable.removeCallback(onMeshRemoved);
        scene.onNewMeshAddedObservable.removeCallback(onMeshAdded);
        unsetTarget();
    });
</script>

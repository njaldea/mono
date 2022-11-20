<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentCamera } from "$lib/core/context/camera";
    import { getCore } from "$lib/core/context/core";

    import type { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
    import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";

    const { scene } = getCore();
    const camera = getCurrentCamera() as ArcRotateCamera;

    export let target = "";

    // Once camera targets a mesh, 3~4 frames are rendered to achieve final result.
    // I think this is due to update in target position does not necessarily update the camera.

    let currentMesh: null | AbstractMesh = null;

    function setTarget(mesh: null | AbstractMesh) {
        if (mesh !== currentMesh) {
            if (mesh) {
                camera.setTarget(mesh);
                camera.update();
            } else if (currentMesh) {
                camera.setTarget(currentMesh.position.clone());
            }
            currentMesh = mesh;
        }
    }

    function unsetTarget() {
        if (currentMesh) {
            camera.setTarget(currentMesh.position.clone());
            currentMesh = null;
        }
    }

    $: setTarget(scene.getMeshByName(target));

    function onMeshAdded(mesh: AbstractMesh) {
        if (mesh.id === target) {
            setTarget(mesh);
        }
    }

    function onMeshRemoved(mesh: AbstractMesh) {
        if (mesh.id === target) {
            unsetTarget();
        }
    }

    scene.onNewMeshAddedObservable.add(onMeshAdded);
    scene.onMeshRemovedObservable.add(onMeshRemoved);

    destructor(() => {
        scene.onMeshRemovedObservable.removeCallback(onMeshRemoved);
        scene.onNewMeshAddedObservable.removeCallback(onMeshAdded);
        unsetTarget();
    });
</script>

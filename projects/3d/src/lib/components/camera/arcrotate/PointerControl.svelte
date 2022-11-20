<script lang="ts">
    import { makeUpdate } from "$lib/core/context/camera";

    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentCamera } from "$lib/core/context/camera";
    import { getCore } from "$lib/core/context/core";

    import type { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";

    const { scene } = getCore();
    const camera = getCurrentCamera() as ArcRotateCamera;

    camera.inputs.attachInput(camera.inputs.attached.pointers);
    camera.inputs.attachInput(camera.inputs.attached.mousewheel);

    camera.wheelDeltaPercentage = 0.01;

    const update = makeUpdate(camera);
    scene.onPointerObservable.add(update);
    destructor(() => {
        scene.onPointerObservable.removeCallback(update);
        camera.inputs.attached.pointers.detachControl();
        camera.inputs.attached.mousewheel.detachControl();
    });
</script>

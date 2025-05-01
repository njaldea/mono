<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { makeUpdate } from "$lib/core/context/camera";
    import { setCurrentCamera } from "$lib/core/context/camera";
    import { getCurrentCanvas } from "$lib/core/context/canvas";
    import { getCore } from "$lib/core/context/core";

    import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
    import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
    import type { Snippet } from "svelte";

    const canvas = getCurrentCanvas();
    const core = getCore();
    const { scene } = core;

    let {
        id,
        sensibility = [1000, 1000],
        alphalimit = [null, null],
        betalimit = [0, 0],
        radiuslimit = [null, null],
        alpha = 0,
        beta = 0,
        radius = 10,
        children
    }: {
        id: string;
        sensibility?: [number, number];
        alphalimit?: [number | null, number | null];
        betalimit?: [number, number];
        radiuslimit?: [number | null, number | null];
        alpha?: number;
        beta?: number;
        radius?: number;
        children?: Snippet;
    } = $props();

    const camera = new ArcRotateCamera(id, alpha, beta, radius, Vector3.Zero(), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true, false);

    // add controls via child component
    camera.inputs.attached.keyboard.detachControl();
    camera.inputs.attached.pointers.detachControl();
    camera.inputs.attached.mousewheel.detachControl();

    $effect(() => {
        camera.alpha = alpha;
        camera.beta = beta;
        camera.radius = radius;
        camera.lowerAlphaLimit = alphalimit[0];
        camera.upperAlphaLimit = alphalimit[1];
        camera.lowerBetaLimit = betalimit[0];
        camera.upperBetaLimit = betalimit[1];
        camera.lowerRadiusLimit = radiuslimit[0];
        camera.upperRadiusLimit = radiuslimit[1];
        camera.angularSensibilityX = sensibility[0];
        camera.angularSensibilityY = sensibility[1];
    });
    camera.wheelPrecision = 50;
    camera.mapPanning = true;

    const update = makeUpdate(camera);
    const render = () => core.render();

    scene.onAfterRenderObservable.add(update);
    camera.onViewMatrixChangedObservable.add(render);

    destructor(() => {
        camera.dispose();
        scene.onAfterRenderObservable.removeCallback(update);
        camera.onViewMatrixChangedObservable.removeCallback(render);
    });

    setCurrentCamera(camera);
</script>

{@render children?.()}

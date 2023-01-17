<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { makeUpdate } from "$lib/core/context/camera";
    import { setCurrentCamera } from "$lib/core/context/camera";
    import { getCurrentCanvas } from "$lib/core/context/canvas";
    import { getCore } from "$lib/core/context/core";

    import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
    import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";

    const canvas = getCurrentCanvas();
    const core = getCore();
    const { scene } = core;

    export let id: string;
    export let sensibility: [number, number] = [1000, 1000];
    export let alphalimit: [number | null, number | null] = [null, null];
    export let betalimit: [number, number] = [0, 0];
    export let radiuslimit: [number | null, number | null] = [null, null];

    export let alpha = 0;
    export let beta = 0;
    export let radius = 10;

    const camera = new ArcRotateCamera(id, alpha, beta, radius, Vector3.Zero(), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true, false);

    // add controls via child component
    camera.inputs.attached.keyboard.detachControl();
    camera.inputs.attached.pointers.detachControl();
    camera.inputs.attached.mousewheel.detachControl();

    $: camera.alpha = alpha;
    $: camera.beta = beta;
    $: camera.radius = radius;
    $: camera.lowerAlphaLimit = alphalimit[0];
    $: camera.upperAlphaLimit = alphalimit[1];
    $: camera.lowerBetaLimit = betalimit[0];
    $: camera.upperBetaLimit = betalimit[1];
    $: camera.lowerRadiusLimit = radiuslimit[0];
    $: camera.upperRadiusLimit = radiuslimit[1];
    camera.wheelPrecision = 50;

    $: camera.angularSensibilityX = sensibility[0];
    $: camera.angularSensibilityY = sensibility[1];
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

<slot />

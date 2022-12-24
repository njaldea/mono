<script lang="ts">
    import {
        ArcRotateCamera,
        Color3,
        Color4,
        Engine,
        HemisphericLight,
        type Mesh,
        MeshBuilder,
        Scene,
        StandardMaterial,
        Vector3
    } from "@babylonjs/core";

    let canvas: HTMLCanvasElement;

    import { onMount } from "svelte";
    let engine: Engine;
    let scene: Scene;

    let value = 5;
    let box1: Mesh;

    onMount(() => {
        engine = new Engine(canvas, true);
        scene = new Scene(engine);
        scene.clearColor = new Color4(0.9, 0.3, 0.3, 1);

        const camera = new ArcRotateCamera(
            "Camera",
            Math.PI / 2,
            Math.PI / 2,
            10,
            new Vector3(10, 10, -30),
            scene
        );
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true, false);

        scene.onPointerObservable.add(() => camera.update());

        const light = new HemisphericLight("light", new Vector3(0, 1, -15), scene);
        light.intensity = 0.7;

        const material = new StandardMaterial("material", scene);
        material.emissiveColor = new Color3(0.3, 0.3, 0.3);
        material.alpha = 0.4;

        const createBox = (x: number, z: number) => {
            const box = MeshBuilder.CreateBox("cube", { height: 5, width: 5, depth: 5 }, scene);
            box.material = material;
            box.position.x = x;
            box.position.y = 0 + 2.5;
            box.position.z = z;
            return box;
        };

        box1 = createBox(0, 0);
        camera.setTarget(box1);
        createBox(2.5, 2.5);

        const render = () => scene.render();

        engine.runRenderLoop(render);
        return () => engine.stopRenderLoop(render);
    });

    const extend = (v: number) => {
        if (box1 != null) {
            // box1.scaling.x = v;
            // box1.rotation.y = v;
            box1.position.x = v;
        }
    };

    $: extend(value);
</script>

<svelte:window
    on:resize={() => {
        engine && engine.resize();
        scene && scene.render();
    }}
/>

<h1>BabylonJS</h1>

<div>
    <input type="range" min={0.1} max={10.0} step={0.001} bind:value />
</div>
<canvas bind:this={canvas} />

<style>
    div {
        width: 50px;
    }
    canvas {
        width: 500px;
        height: 500px;
    }
</style>

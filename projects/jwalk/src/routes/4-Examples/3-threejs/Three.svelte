<script lang="ts" context="module">
    import { onDestroy } from "svelte";
    import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";
</script>

<script lang="ts">
    export let canvas: HTMLCanvasElement;

    const camera = new PerspectiveCamera(70, 1, 0.1, 50);
    camera.position.z = 2;

    const controls = new OrbitControls(camera, canvas);

    const scene = new Scene();

    const renderer = new WebGLRenderer({
        canvas,
        antialias: true
    });
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();

    let running = true;
    const render = () => {
        if (running) {
            requestAnimationFrame(render);
            controls.update();
            renderer.render(scene, camera);
        }
    };
    render();

    onDestroy(() => {
        running = false;
        renderer.dispose();
    });
</script>

<slot {scene} />

<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCore } from "$lib/core/context/core";

    import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight.js";
    import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";

    const { scene } = getCore();

    let {
        id,
        intensity = 1,
        direction = [0, 0, 0]
    }: {
        id: string;
        intensity: number;
        direction?: [number, number, number];
    } = $props();

    const light = new HemisphericLight(id, new Vector3(...direction), scene);

    $effect(() => {
        light.direction.x = direction[0];
        light.direction.y = direction[1];
        light.direction.z = direction[2];
        light.intensity = intensity;
    });

    destructor(() => light.dispose());
</script>

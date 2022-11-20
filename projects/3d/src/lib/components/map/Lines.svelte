<script lang="ts">
    import MeshComponent from "$lib/components/mesh/Mesh.svelte";
    import { getCore } from "$lib/core/context/core";

    import { Color3 } from "@babylonjs/core";
    import type { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
    import { CreateLineSystem } from "@babylonjs/core/Meshes/Builders/linesBuilder.js";

    const { scene } = getCore();

    export let id: string;
    export let vertices: Vector3[][];
    export let frozen: undefined | boolean = undefined;
    export let color: [number, number, number];

    const lines = CreateLineSystem(
        `lines_${id}`,
        {
            lines: vertices,
            updatable: false
        },
        scene
    );
    $: lines.color = new Color3(...color);
</script>

<MeshComponent mesh={lines} {frozen}>
    <slot />
</MeshComponent>

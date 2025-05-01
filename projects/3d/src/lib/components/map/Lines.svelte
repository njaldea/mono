<script lang="ts">
    import MeshComponent from "$lib/components/mesh/Mesh.svelte";
    import { getCore } from "$lib/core/context/core";

    import { Color3 } from "@babylonjs/core";
    import type { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
    import { CreateLineSystem } from "@babylonjs/core/Meshes/Builders/linesBuilder.js";
    import type { Snippet } from "svelte";

    const { scene } = getCore();

    let {
        id,
        vertices,
        frozen,
        color,
        children
    }: {
        id: string;
        vertices: Vector3[][];
        frozen?: boolean;
        color: [number, number, number];
        children?: Snippet;
    } = $props();

    const lines = CreateLineSystem(
        `lines_${id}`,
        {
            lines: vertices,
            updatable: false
        },
        scene
    );
    $effect(() => { lines.color = new Color3(...color); });
</script>

<MeshComponent mesh={lines} {frozen}>
    {@render children?.()}
</MeshComponent>

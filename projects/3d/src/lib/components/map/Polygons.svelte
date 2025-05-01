<script lang="ts">
    import MeshComponent from "$lib/components/mesh/Mesh.svelte";
    import { PolygonMeshBuilder } from "@babylonjs/core/Meshes/polygonMesh";
    import { getCore } from "$lib/core/context/core";
    import { destructor } from "$lib/core/lifecycle/destructor";

    import type { Vector2 } from "@babylonjs/core/Maths/math.vector.js";
    import earcut from "earcut";
    import type { Snippet } from "svelte";

    const { scene } = getCore();

    let {
        id,
        vertices,
        frozen,
        children
    }: {
        id: string;
        vertices: Vector2[][];
        frozen?: boolean;
        children?: Snippet;
    } = $props();

    const first = vertices[0];
    const builder = new PolygonMeshBuilder(`polygons_${id}`, first, scene, earcut);
    for (let i = 1; i < vertices.length; ++i) {
        builder.addHole(vertices[i]);
    }
    const polygon = builder.build(false, 0);
    destructor(() => polygon.dispose());
</script>

<MeshComponent mesh={polygon} {frozen}>
    {@render children?.()}
</MeshComponent>

<script lang="ts">
    import MeshComponent from "$lib/components/mesh/Mesh.svelte";

    import { getCore } from "$lib/core/context/core";

    import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
    import type { Snippet } from "svelte";

    const { scene } = getCore();

    let {
        id,
        position,
        rotation,
        scaling,
        disabled,
        children
    }: {
        id: string;
        position?: [number, number, number];
        rotation?: [number, number, number];
        scaling?: [number, number, number];
        disabled?: boolean;
        children?: Snippet;
    } = $props();

    const mesh = MeshBuilder.CreateGround(
        id,
        {
            width: 10000,
            height: 10000,
            subdivisions: 2
        },
        scene
    );
    mesh.infiniteDistance = true;
</script>

<MeshComponent {mesh} {position} {rotation} {scaling} {disabled}>
    {@render children?.()}
</MeshComponent>

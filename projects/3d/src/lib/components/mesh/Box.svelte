<script lang="ts">
    import MeshComponent from "$lib/components/mesh/Mesh.svelte";

    import { getCore } from "$lib/core/context/core";

    import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
    import type { Snippet } from "svelte";

    const { scene } = getCore();

    let {
        id,
        size = [1, 1, 1],
        position,
        rotation,
        scaling,
        disabled,
        hidden,
        edgeWidth,
        edgeRendering,
        children
    }: {
        id: string;
        size?: [number, number, number];
        position?: [number, number, number];
        rotation?: [number, number, number];
        scaling?: [number, number, number];
        disabled?: boolean;
        hidden?: boolean;
        edgeWidth?: number;
        edgeRendering?: boolean;
        children: Snippet;
    } = $props();

    const mesh = MeshBuilder.CreateBox(
        id,
        {
            depth: size[0],
            width: size[1],
            height: size[2]
        },
        scene
    );
</script>

<MeshComponent
    {mesh}
    {position}
    {rotation}
    {scaling}
    {disabled}
    {edgeWidth}
    {edgeRendering}
    {hidden}
>
    {@render children?.()}
</MeshComponent>

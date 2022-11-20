<script lang="ts">
    import MeshComponent from "$lib/components/mesh/Mesh.svelte";

    import { getCore } from "$lib/core/context/core";

    import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";

    const { scene } = getCore();

    export let id: string;
    export let size: [number, number, number] = [1, 1, 1];
    export let position: undefined | [number, number, number] = undefined;
    export let rotation: undefined | [number, number, number] = undefined;
    export let scaling: undefined | [number, number, number] = undefined;
    export let disabled: undefined | boolean = undefined;

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

<MeshComponent {mesh} {position} {rotation} {scaling} {disabled}>
    <slot />
</MeshComponent>

<script lang="ts">
    import MeshComponent from "$lib/components/mesh/Mesh.svelte";

    import { getCore } from "$lib/core/context/core";

    import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";

    const { scene } = getCore();

    export let position: undefined | [number, number, number] = undefined;
    export let rotation: undefined | [number, number, number] = undefined;
    export let scaling: undefined | [number, number, number] = undefined;
    export let disabled: undefined | boolean = undefined;

    export let id: string;

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
    <slot />
</MeshComponent>

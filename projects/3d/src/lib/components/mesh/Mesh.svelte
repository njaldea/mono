<script lang="ts">
    import { setCurrentMesh } from "$lib/core/context/mesh";

    import Node from "$lib/components/node/Node.svelte";

    import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";

    export let mesh: Mesh;

    export let position: undefined | [number, number, number] = undefined;
    export let rotation: undefined | [number, number, number] = undefined;
    export let scaling: undefined | [number, number, number] = undefined;
    export let disabled: undefined | boolean = undefined;
    export let frozen: undefined | boolean = undefined;

    setCurrentMesh(mesh);
</script>

<Node node={mesh} {position} {rotation} {scaling} {disabled} {frozen}>
    <slot />
</Node>

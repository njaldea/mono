<script lang="ts">
    import Node from "$lib/components/node/Node.svelte";

    import { getCore } from "$lib/core/context/core";

    import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";

    export let id: string;
    export let position: undefined | [number, number, number] = undefined;
    export let rotation: undefined | [number, number, number] = undefined;
    export let scaling: undefined | [number, number, number] = undefined;
    export let disabled: undefined | boolean = undefined;

    const { scene } = getCore();
    const node = new TransformNode(id, scene);
</script>

<Node {node} {position} {rotation} {scaling} {disabled}>
    <slot />
</Node>

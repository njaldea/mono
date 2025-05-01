<script lang="ts">
    import Node from "$lib/components/node/Node.svelte";

    import { getCore } from "$lib/core/context/core";

    import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
    import type { Snippet } from "svelte";

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

    const { scene } = getCore();
    const node = new TransformNode(id, scene);
</script>

<Node {node} {position} {rotation} {scaling} {disabled}>
    {@render children?.()}
</Node>

<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getNode, setNode } from "$lib/core/context/node";

    import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
    import type { Snippet } from "svelte";

    let {
        position = [0, 0, 0],
        rotation = [0, 0, 0],
        scaling = [1, 1, 1],
        disabled = false,
        frozen = false,
        node,
        children
    }: {
        position?: [number, number, number];
        rotation?: [number, number, number];
        scaling?: [number, number, number];
        disabled?: boolean;
        frozen?: boolean;
        node: TransformNode;
        children?: Snippet;
    } = $props();

    $effect(() => {
        node.position.x = position[0];
        node.position.y = position[1];
        node.position.z = position[2];
    });

    $effect(() => {
        node.rotation.x = rotation[0];
        node.rotation.y = rotation[1];
        node.rotation.z = rotation[2];
    });

    $effect(() => {
        node.scaling.x = scaling[0];
        node.scaling.y = scaling[1];
        node.scaling.z = scaling[2];
    });

    $effect(() => {
        node.setEnabled(!disabled);
    });
    $effect(() => {
        frozen ? node.freezeWorldMatrix() : node.unfreezeWorldMatrix();
    });

    node.parent = getNode() ?? null;
    setNode(node);
    destructor(() => node.dispose());
</script>

{@render children?.()}

<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getNode, setNode } from "$lib/core/context/node";

    import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";

    export let position: [number, number, number] = [0, 0, 0];
    export let rotation: [number, number, number] = [0, 0, 0];
    export let scaling: [number, number, number] = [1, 1, 1];
    export let disabled = false;
    export let frozen = false;

    export let node: TransformNode;

    $: node.position.x = position[0];
    $: node.position.y = position[1];
    $: node.position.z = position[2];

    $: node.rotation.x = rotation[0];
    $: node.rotation.y = rotation[1];
    $: node.rotation.z = rotation[2];

    $: node.scaling.x = scaling[0];
    $: node.scaling.y = scaling[1];
    $: node.scaling.z = scaling[2];

    $: node.setEnabled(!disabled);
    $: frozen ? node.freezeWorldMatrix() : node.unfreezeWorldMatrix();

    node.parent = getNode();
    setNode(node);
    destructor(() => node.dispose());
</script>

<slot />

<script lang="ts">
    import Material from "$lib/components/material/Material.svelte";
    import type { AlphaMode } from "$lib/components/material/AlphaMode";

    import { getCore } from "$lib/core/context/core";

    import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";

    const { scene } = getCore();

    export let id: string;

    export let color: [number, number, number] = [0.3, 0.3, 0.3];
    export let useLogarithmicDepth = false;
    export let disableLighting = false;

    export let alpha: undefined | number = undefined;
    export let alphaMode: undefined | AlphaMode = undefined;
    export let needDepthPrePass: undefined | boolean = undefined;
    export let backFaceCulling: undefined | boolean = undefined;
    export let frozen: undefined | boolean = undefined;

    const material = new StandardMaterial(id, scene);
    $: material.emissiveColor.r = color[0];
    $: material.emissiveColor.g = color[1];
    $: material.emissiveColor.b = color[2];
    $: material.useLogarithmicDepth = useLogarithmicDepth;
    $: material.disableLighting = disableLighting;
</script>

<Material {material} {alpha} {alphaMode} {needDepthPrePass} {backFaceCulling} {frozen} />

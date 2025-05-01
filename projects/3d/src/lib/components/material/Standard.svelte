<script lang="ts">
    import Material from "$lib/components/material/Material.svelte";
    import type { AlphaMode } from "$lib/components/material/AlphaMode";

    import { getCore } from "$lib/core/context/core";

    import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";

    const { scene } = getCore();

    let {
        id,
        color = [0.3, 0.3, 0.3],
        useLogarithmicDepth = false,
        disableLighting = false,
        alpha,
        alphaMode,
        needDepthPrePass,
        backFaceCulling,
        frozen
    }: {
        id: string;
        color?: [number, number, number];
        useLogarithmicDepth?: boolean;
        disableLighting?: boolean;
        alpha?: number;
        alphaMode?: AlphaMode;
        needDepthPrePass?: boolean;
        backFaceCulling?: boolean;
        frozen?: boolean;
    } = $props();

    const material = new StandardMaterial(id, scene);
    $effect(() => {
        material.emissiveColor.r = color[0];
        material.emissiveColor.g = color[1];
        material.emissiveColor.b = color[2];
        material.useLogarithmicDepth = useLogarithmicDepth;
        material.disableLighting = disableLighting;
    });
</script>

<Material {material} {alpha} {alphaMode} {needDepthPrePass} {backFaceCulling} {frozen} />

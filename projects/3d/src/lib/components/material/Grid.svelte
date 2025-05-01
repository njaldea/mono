<script lang="ts">
    import Material from "$lib/components/material/Material.svelte";
    import type { AlphaMode } from "$lib/components/material/AlphaMode";

    import { getCore } from "$lib/core/context/core";

    import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial.js";

    const { scene } = getCore();

    let {
        id,
        opacity = 0.5,
        gridRatio = 1,
        mainColor = [1, 1, 1],
        lineColor = [1, 1, 1],
        alpha,
        alphaMode,
        needDepthPrePass,
        backFaceCulling,
        frozen
    }: {
        id: string;
        opacity?: number;
        gridRatio?: number;
        mainColor?: [number, number, number];
        lineColor?: [number, number, number];
        alpha?: number;
        alphaMode?: AlphaMode;
        needDepthPrePass?: boolean;
        backFaceCulling?: boolean;
        frozen?: boolean;
    } = $props();

    const material = new GridMaterial(id, scene);
    material.majorUnitFrequency = 10;
    material.minorUnitVisibility = 0.25;

    $effect(() => {
        material.opacity = opacity;
        material.gridRatio = gridRatio;
        material.mainColor.r = mainColor[0];
        material.mainColor.g = mainColor[1];
        material.mainColor.b = mainColor[2];
        material.lineColor.r = lineColor[0];
        material.lineColor.g = lineColor[1];
        material.lineColor.b = lineColor[2];
    });
</script>

<Material {material} {alpha} {alphaMode} {needDepthPrePass} {backFaceCulling} {frozen} />

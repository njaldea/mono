<script lang="ts">
    import Material from "$lib/components/material/Material.svelte";
    import type { AlphaMode } from "$lib/components/material/AlphaMode";

    import { getCore } from "$lib/core/context/core";

    import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial.js";

    const { scene } = getCore();

    export let id: string;

    export let opacity = 0.5;
    export let gridRatio = 1;
    export let mainColor: [number, number, number] = [1, 1, 1];
    export let lineColor: [number, number, number] = [1, 1, 1];

    export let alpha: undefined | number = undefined;
    export let alphaMode: undefined | AlphaMode = undefined;
    export let needDepthPrePass: undefined | boolean = undefined;
    export let backFaceCulling: undefined | boolean = undefined;
    export let frozen: undefined | boolean = undefined;

    const material = new GridMaterial(id, scene);
    material.majorUnitFrequency = 10;
    material.minorUnitVisibility = 0.25;

    $: material.opacity = opacity;
    $: material.gridRatio = gridRatio;
    $: material.mainColor.r = mainColor[0];
    $: material.mainColor.g = mainColor[1];
    $: material.mainColor.b = mainColor[2];
    $: material.lineColor.r = lineColor[0];
    $: material.lineColor.g = lineColor[1];
    $: material.lineColor.b = lineColor[2];
</script>

<Material {material} {alpha} {alphaMode} {needDepthPrePass} {backFaceCulling} {frozen} />

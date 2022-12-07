<script lang="ts">
    import Camera from "./Camera.svelte";
    import Canvas from "$lib/components/Canvas.svelte";
    import HemisphericLight from "$lib/components/lights/HemisphericLight.svelte";
    import Ground from "$lib/components/mesh/Ground.svelte";
    import Instance from "$lib/components/mesh/Instance.svelte";
    import StandardMaterial from "$lib/components/material/Standard.svelte";
    import RefMaterial from "$lib/components/material/Reference.svelte";
    import GridMaterial from "$lib/components/material/Grid.svelte";
    import TransformNode from "$lib/components/node/TransformNode.svelte";
    import FSUI from "$lib/components/gui/FullscreenUI.svelte";

    import Box from "./Box.svelte";
    import RotatingBox from "./RotatingBox.svelte";

    export let id: string;
    export let target: string;
    export let intensity: number;
    export let direction: [number, number, number];
    export let position: [number, number, number];
    export let rotation: [number, number, number];
    export let scaling: [number, number, number];
    export let color: [number, number, number];
    export let toggle: boolean;
    export let materialID: string;
    $: inversepos = [-position[0], -position[1], -position[2]] as [number, number, number];
    $: inverserot = [-rotation[0], -rotation[1], -rotation[2]] as [number, number, number];
</script>

<Canvas>
    <Camera
        id={`main-cam-${id}`}
        toggle={true}
        {target}
        alpha={Math.PI / 3}
        beta={Math.PI / 3}
        radius={30}
    />
    <FSUI />

    <StandardMaterial id="standard" useLogarithmicDepth alpha={0.7} {color} />
    <GridMaterial id="grid" gridRatio={0.5} backFaceCulling={false} />

    <HemisphericLight id="light" {intensity} {direction} />

    <TransformNode id="groundgroup" position={[0, -0.001, 0]}>
        <Ground id="ground">
            <GridMaterial id="ground" backFaceCulling={false} />
        </Ground>
    </TransformNode>

    {#if toggle}
        <RotatingBox>
            <RefMaterial id={materialID} />
        </RotatingBox>
    {/if}
    <Box scaling={[1, 1, 2]} id="box1" {position} {rotation}>
        <RefMaterial id={materialID} />

        {#each { length: 2 } as _, i (i)}
            <Instance id={i.toString()} position={[1, 1, i + 1]} />
        {/each}
    </Box>
    <Box id="box2" position={inversepos} rotation={inverserot}>
        <RefMaterial id={materialID} />
    </Box>

    <TransformNode id="group1" {rotation} {scaling}>
        <Box id="box3" position={[2, 0.5, 2]} scaling={[1, 1, 1]}>
            <RefMaterial id={materialID} />
        </Box>
        <Box id="box4" position={[3, 0.5, 3]} scaling={[1, 1, 1]}>
            <RefMaterial id={materialID} />
        </Box>
    </TransformNode>

    <slot />
</Canvas>

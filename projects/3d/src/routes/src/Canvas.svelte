<script lang="ts">
    import Canvas from "$lib/components/Canvas.svelte";
    import FSUI from "$lib/components/gui/FullscreenUI.svelte";

    import Ground from "$lib/components/mesh/Ground.svelte";
    import Instance from "$lib/components/mesh/Instance.svelte";

    import GridMaterial from "$lib/components/material/Grid.svelte";
    import RefMaterial from "$lib/components/material/Reference.svelte";
    import StandardMaterial from "$lib/components/material/Standard.svelte";

    import TransformNode from "$lib/components/node/TransformNode.svelte";
    import HemisphericLight from "$lib/components/lights/HemisphericLight.svelte";

    import Box from "$lib/components/mesh/Box.svelte";
    import Camera from "./Camera.svelte";
    import RotatingBox from "./RotatingBox.svelte";
    import Action from "./Action.svelte";
    import type { Snippet } from "svelte";

    let {
        id,
        target,
        intensity,
        direction,
        position,
        rotation,
        scaling,
        color,
        toggle,
        materialID,
        instances,
        children
    }: {
        id: string;
        target: string;
        intensity: number;
        direction: [number, number, number];
        position: [number, number, number];
        rotation: [number, number, number];
        scaling: [number, number, number];
        color: [number, number, number];
        toggle: boolean;
        materialID: string;
        instances: number;
        children?: Snippet;
    } = $props();

    let inversepos = $derived.by(() => {
        if (!position) return [0, 0, 0] as [number, number, number];
        return [-position[0], -position[1], -position[2]] as [number, number, number];
    });
    let inverserot = $derived.by(() => {
        if (!rotation) return [0, 0, 0] as [number, number, number];
        return [-rotation[0], -rotation[1], -rotation[2]] as [number, number, number];
    });

    const permutation = function* (i: number) {
        if (0 === i) return;
        const minmax = [i, -i];
        for (let j = i; j >= -i; j -= 2) {
            for (let k = i; k >= -i; k -= 2) {
                if (minmax.includes(j) || minmax.includes(k)) {
                    yield [j, k];
                }
            }
        }
    };
</script>

<Canvas>
    <Camera
        id={`main-cam-${id}`}
        {target}
        toggle
        alpha={Math.PI / 3}
        beta={Math.PI / 3}
        radius={30}
    />
    <FSUI />

    <StandardMaterial id="standard" useLogarithmicDepth alpha={0.7} {color} alphaMode={"Disable"} />
    <StandardMaterial
        id="standard2"
        useLogarithmicDepth
        alpha={0.7}
        color={[0, 0, 1]}
        alphaMode={"Disable"}
    />
    <GridMaterial id="grid" gridRatio={0.5} backFaceCulling={false} />

    <HemisphericLight id="light" {intensity} {direction} />

    <TransformNode id="groundgroup" position={[0, -0.001, 0]}>
        <Ground id="ground">
            <GridMaterial id="ground" backFaceCulling={false} />
        </Ground>
    </TransformNode>

    {#if toggle}
        <RotatingBox id="rotating" edgeWidth={1} edgeRendering>
            <RefMaterial id={materialID} />
            <Action text={"rotating"} />
        </RotatingBox>
    {/if}

    <Box id="box1" position={[0, 0.5, 0]} {rotation} edgeWidth={1} edgeRendering>
        <RefMaterial id={materialID} />
        <Action text={"box1"} />

        <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
        {#each { length: instances } as _, i (i)}
            {#each [...permutation(i)] as [x, y] (`[${x}, ${y}]`)}
                <Instance
                    id={`${i}-[${x}, ${y}]`}
                    edgeWidth={i}
                    edgeRendering
                    position={[x, 0, y]}
                />
            {/each}
        {/each}
    </Box>
    <Box id="box2" position={inversepos} rotation={inverserot} edgeWidth={1} edgeRendering>
        <RefMaterial id={materialID} />
        <Action text={"box2"} />
    </Box>

    <TransformNode id="group1" {rotation} {scaling}>
        <Box id="box3" position={[2, 0.5, 2]} scaling={[1, 1, 1]} edgeWidth={1} edgeRendering>
            <RefMaterial id={"standard2"} />
            <Action text={"box3"} />
        </Box>
        <Box id="box4" position={[3, 0.5, 3]} scaling={[1, 1, 1]} edgeWidth={1} edgeRendering>
            <RefMaterial id={"standard2"} />
            <Action text={"box4"} />
        </Box>
    </TransformNode>

    {@render children?.()}
</Canvas>

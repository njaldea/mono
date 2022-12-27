<script lang="ts">
    import { Component } from "$lib/components";
    import { Box } from "$lib/components/mesh";
    import { onMount } from "svelte";

    export let id: string;
    export let edgeWidth: undefined | number = undefined;
    export let edgeRendering: undefined | boolean = undefined;

    let rotation = [0, 0, 0] as [number, number, number];
    const rotate = () => {
        rotation[0] += 0.1;
    };

    onMount(() => {
        const interval = setInterval(rotate, 1000 / 60);
        return () => clearInterval(interval);
    });
</script>

<Component>
    <Box {id} position={[5, 0, 5]} {rotation} {edgeWidth} {edgeRendering}>
        <slot />
    </Box>
</Component>

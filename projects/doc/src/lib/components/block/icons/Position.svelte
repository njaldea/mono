<script lang="ts" context="module">
    const bottom = {
        width: 60,
        height: 20,
        x: -30,
        y: 10
    } as const;
    const right = {
        width: 20,
        height: 60,
        x: 10,
        y: -30
    } as const;
    const nobottom = {
        width: 60,
        height: 0,
        x: -30,
        y: 30
    } as const;
    const noright = {
        width: 0,
        height: 60,
        x: 30,
        y: -30
    } as const;
    const settings = {
        hidden: [nobottom, noright],
        bottom: [bottom, noright],
        right: [nobottom, right]
    } as const;
</script>

<script lang="ts">
    import { tweened } from "svelte/motion";
    export let position: "hidden" | "bottom" | "right" = "hidden";

    const offset = tweened(settings[position], { duration: 150 });
    $: $offset = settings[position];
</script>

<svg viewBox="-50 -50 100 100">
    <rect width="60" height="60" x="-30" y="-30" fill="transparent" />
    <rect {...$offset[0]} />
    <rect {...$offset[1]} />
</svg>

<style>
    svg {
        stroke-width: 3;
        fill: currentColor;
    }
</style>

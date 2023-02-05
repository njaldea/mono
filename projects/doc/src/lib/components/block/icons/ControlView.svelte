<script lang="ts" context="module">
</script>

<script lang="ts">
    import { tweened } from "svelte/motion";
    export let mode: "prop" | "event" = "prop";

    const v = tweened(mode === "event" ? 1 : 0, { duration: 150 });
    $: $v = mode === "event" ? 1 : 0;
</script>

<svg viewBox="-50 -50 100 100">
    <rect width="60" height="60" x="-30" y="-30" fill="transparent" />
    <rect height="40" width="20" x={-$v * 20} y="-20" rx="2" ry="2" fill="transparent" />
    <polygon transform="translate(5, 0)" points="-15,-2 1,-2, 1,-6 6,0 1,6 1,2 -15,2" />
</svg>

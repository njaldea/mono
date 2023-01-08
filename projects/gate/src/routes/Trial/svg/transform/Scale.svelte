<script lang="ts">
    import { initScale, getScale } from "../context";

    const parent = getScale();
    const current = initScale();

    export let x: number;
    export let y: number;

    $: $current = { x: $parent.x * x, y: $parent.y * y };
</script>

<g transform={`scale(${x} ${y})`}>
    <slot />
</g>

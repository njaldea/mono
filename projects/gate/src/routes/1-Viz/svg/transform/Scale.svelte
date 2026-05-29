<script lang="ts">
    import { initScale, getScale } from "../context";
    import type { Snippet } from "svelte";

    const parent = getScale();
    const current = initScale();

    let { x, y, children }: { x: number; y: number; children?: Snippet } = $props();

    $effect(() => {
        $current = { x: $parent.x * x, y: $parent.y * y };
    });
</script>

<g transform={`scale(${x} ${y})`}>
    {@render children?.()}
</g>

<script lang="ts">
    import type { Snippet } from "svelte";

    let { x, y, children }: { x: number; y: number; children?: Snippet } = $props();
</script>

<g transform={`translate(${x} ${y})`}>
    {@render children?.()}
</g>

<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        rotation,
        x,
        y,
        children
    }: { rotation: number; x: number; y: number; children?: Snippet } = $props();
</script>

<g transform={`rotate(${rotation} ${x} ${y})`}>
    {@render children?.()}
</g>

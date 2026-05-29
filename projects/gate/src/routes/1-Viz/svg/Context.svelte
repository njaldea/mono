<script lang="ts">
    import { initSVG, initScale } from "./context";
    import type { Snippet } from "svelte";

    let { svg, children }: { svg: SVGSVGElement; children?: Snippet } = $props();

    initSVG(svg);
    initScale();
</script>

{@render children?.()}

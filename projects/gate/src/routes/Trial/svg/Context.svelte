<script lang="ts">
    import { initSVG, initScale } from "./context";

    export let svg: SVGSVGElement;

    initSVG(svg);
    initScale();
</script>

<slot />

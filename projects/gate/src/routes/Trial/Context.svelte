<script lang="ts">
    import { initSVG } from "./context";

    export let svg: SVGSVGElement;

    initSVG(svg);
</script>

<slot />

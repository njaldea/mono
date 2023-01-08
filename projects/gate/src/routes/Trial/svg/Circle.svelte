<script lang="ts" context="module">
    import { get } from "svelte/store";
    import type { Writable } from "svelte/store";

    type Detail = {
        svg: SVGSVGElement;
        scale: Writable<{ x: number; y: number }>;
        change: (dx: number, dy: number) => void;
    };

    const action = (e: SVGElement, { svg, scale, change }: Detail) => {
        let moving = false;
        let refPageX = 0;
        let refPageY = 0;

        let refScaleW = 1;
        let refScaleH = 1;

        const engage = (e: PointerEvent) => {
            moving = true;
            refPageX = e.clientX;
            refPageY = e.clientY;

            const m = svg.getScreenCTM();
            refScaleW = m?.a ?? 1;
            refScaleH = m?.d ?? 1;
        };

        const disengage = () => {
            moving = false;
        };

        const move = (e: PointerEvent) => {
            if (moving) {
                const pageX = e.clientX;
                const pageY = e.clientY;
                change(
                    (pageX - refPageX) / (refScaleW * get(scale).x),
                    (pageY - refPageY) / (refScaleH * get(scale).y)
                );
                refPageX = pageX;
                refPageY = pageY;
            }
        };

        e.addEventListener("pointerdown", engage);
        window.addEventListener("pointerup", disengage);
        window.addEventListener("pointercancel", disengage);
        window.addEventListener("pointermove", move);
        return {
            destroy: () => {
                e.removeEventListener("pointerdown", engage);
                window.removeEventListener("pointerup", disengage);
                window.removeEventListener("pointercancel", disengage);
                window.removeEventListener("pointermove", move);
            }
        };
    };
</script>

<script lang="ts">
    export let x = 0;
    export let y = 0;
    export let draggable = false;

    import { getSVG, getScale } from "./context";

    const svg = getSVG();
    const scale = getScale();

    const change = (dx: number, dy: number) => {
        x += dx;
        y += dy;
    };
</script>

{#if draggable}
    <circle use:action={{ svg, scale, change }} cx={x} cy={y} r="2" />
{:else}
    <circle cx={x} cy={y} r="2" />
{/if}

<style>
    circle {
        stroke-width: 1px;
        fill: white;
    }
</style>

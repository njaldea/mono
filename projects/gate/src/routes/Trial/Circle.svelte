<script lang="ts" context="module">
    import { get } from "svelte/store";
    import type { Writable } from "svelte/store";

    type Detail = {
        svg: SVGSVGElement;
        scale: Writable<{ x: number; y: number }>;
        change: (dx: number, dy: number) => void;
    };

    function action(e: SVGElement, { svg, scale, change }: Detail) {
        let moving = false;
        let current_page_x = 0;
        let current_page_y = 0;

        let scale_w = 1;
        let scale_h = 1;

        function engage(e: PointerEvent) {
            moving = true;
            current_page_x = e.clientX;
            current_page_y = e.clientY;

            const m = svg.getScreenCTM();
            scale_w = m?.a ?? 1;
            scale_h = m?.d ?? 1;
        }

        function disengage() {
            moving = false;
        }

        function move(e: PointerEvent) {
            if (moving) {
                const page_x = e.clientX;
                const page_y = e.clientY;
                change(
                    (page_x - current_page_x) / (scale_w * get(scale).x),
                    (page_y - current_page_y) / (scale_h * get(scale).y)
                );
                current_page_x = page_x;
                current_page_y = page_y;
            }
        }

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
    }
</script>

<script lang="ts">
    export let x = 0;
    export let y = 0;
    export let draggable = false;

    import { getSVG, getScale } from "./context";

    const svg = getSVG();
    const scale = getScale();

    function change(dx: number, dy: number) {
        x += dx;
        y += dy;
    }
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

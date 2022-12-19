<script lang="ts">
    export let x1 = 0;
    export let y1 = 0;
    export let x2 = 0;
    export let y2 = 0;

    import { getSVG } from "./context";

    const svg = getSVG();

    let engaged = false;

    const action = (change: (dx: number, dy: number) => void) => {
        return function(e: SVGElement)
        {
            let moving = false;
            let current_page_x = 0;
            let current_page_y = 0;

            let matrix_a = 1;
            let matrix_d = 1;

            function engage(e: PointerEvent) {
                moving = true;
                engaged = true;
                current_page_x = e.pageX;
                current_page_y = e.pageY;
                const matrix = svg.getCTM() as DOMMatrix;
                matrix_a = matrix.a;
                matrix_d = matrix.d;
            }

            function disengage() {
                engaged = false;
                moving = false;
            }

            function move(e: PointerEvent) {
                if (moving) {
                    const page_x = e.pageX;
                    const page_y = e.pageY;
                    change(
                        (page_x - current_page_x) / matrix_a,
                        (page_y - current_page_y) / matrix_d
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
    }

    const beginaction = action((dx, dy) => {
        x1 += dx;
        y1 += dy;
    });
    const endaction = action((dx, dy) => {
        x2 += dx;
        y2 += dy;
    });
</script>

<g class:engaged>
    <line {x1} {y1} {x2} {y2}/>
    <circle use:beginaction cx={x1} cy={y1} r="1"/>
    <circle use:endaction cx={x2} cy={y2} r="1"/>
</g>

<style>
    g {
        stroke-width: 1px;
    }

    g > circle {
        visibility: hidden;
    }
    g.engaged > circle,
    g:hover > circle {
        visibility: visible;
    }
</style>
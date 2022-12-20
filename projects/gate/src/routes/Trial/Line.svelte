<script lang="ts">
    export let x1 = 0;
    export let y1 = 0;
    export let x2 = 0;
    export let y2 = 0;

    import { getSVG } from "./context";

    const svg = getSVG();

    let engaged = false;

    const action = (change: (dx: number, dy: number) => void) => {
        return function (e: SVGElement) {
            let moving = false;
            let current_page_x = 0;
            let current_page_y = 0;

            let scale_w = 1;
            let scale_h = 1;

            function engage(e: PointerEvent) {
                moving = true;
                engaged = true;
                current_page_x = e.pageX;
                current_page_y = e.pageY;
                scale_w = svg.clientWidth / 100;
                scale_h = svg.clientHeight / 100;
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
                        (page_x - current_page_x) / scale_w,
                        (page_y - current_page_y) / scale_h
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
        };
    };

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
    <line {x1} {y1} {x2} {y2} />
    <circle use:beginaction cx={x1} cy={y1} r="2" />
    <circle use:endaction cx={x2} cy={y2} r="2" />
</g>

<style>
    g {
        fill: white;
        stroke-width: 1px;
    }

    g > circle {
        stroke-width: 0px;
        fill: transparent;
    }

    g.engaged > circle,
    g:hover > circle {
        stroke-width: 1px;
        fill: white;
    }
</style>

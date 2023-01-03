<script lang="ts">
    import { tweened } from "svelte/motion";

    const action = (p: SVGPathElement, options: { length: number }) => {
        const total = p.getTotalLength();
        p.style.strokeDasharray = `${total * options.length} ${total}`;
        return {
            update: (options: { length: number }) => {
                const total = p.getTotalLength();
                p.style.strokeDasharray = `${total * options.length} ${total}`;
            }
        };
    };

    const d = "M 0 -15 L 15 -15 L 15 0 L 0 0 -9 0 A 6 8 135 0 1 9 0";

    const length = tweened(1);

    let out = false;

    const click = () => {
        if (0 === $length) {
            $length = 1;
            out = false;
        } else if (!out) {
            $length = 0;
            out = true;
        }
    };

    $: 0 === $length && click();
</script>

<svg viewBox="-35 -35 70 70" on:click={click} on:keypress={null}>
    <g transform="rotate(45 0 0)">
        <path {d} use:action={{ length: $length }} />
    </g>
    <g transform="rotate(225 0 0)">
        <path {d} use:action={{ length: $length }} />
    </g>
</svg>

<style>
    svg {
        width: 100%;
        height: 100%;
        fill: transparent;
        stroke: currentColor;
        stroke-width: 4;
        stroke-linejoin: miter;
        cursor: pointer;
    }
</style>

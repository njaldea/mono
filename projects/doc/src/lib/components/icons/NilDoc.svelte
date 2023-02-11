<script lang="ts" context="module">
    const action = (p: SVGPathElement, length: number) => {
        const update = (length: number) => (p.style.strokeDasharray = `${length} 100`);
        update(length);
        return { update };
    };
</script>

<script lang="ts">
    import { tweened } from "svelte/motion";

    const d = "M 0 -15 L 15 -15 L 15 0 L 0 0 -9 0 A 6 8 135 0 1 9 0";
    const length = tweened(100);

    const trigger = () => {
        if (0 === $length) {
            $length = 100;
        } else if (100 === $length) {
            $length = 0;
        }
    };

    $: 0 === $length && trigger();
</script>

<svg viewBox="-35 -35 70 70" on:pointerenter={trigger}>
    <g transform="rotate(45 0 0)">
        <path {d} use:action={$length} pathLength={100} />
    </g>
    <g transform="rotate(225 0 0)">
        <path {d} use:action={$length} pathLength={100} />
    </g>
</svg>

<style>
    svg {
        width: 100%;
        height: 100%;
        stroke-width: 3;
        stroke-linejoin: miter;
        stroke: currentColor;
        fill: transparent;
    }
</style>

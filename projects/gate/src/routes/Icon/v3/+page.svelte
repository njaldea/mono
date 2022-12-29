<script lang="ts">
    export let length = 1;
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
</script>

<input type="range" min={0} max={1} step={0.01} bind:value={length} />
<div>
    <svg viewBox="-22 -22 44 44">
        <g transform="rotate(45 0 0)">
            <path {d} use:action={{ length }} />
        </g>
        <g transform="rotate(225 0 0)">
            <path {d} use:action={{ length }} />
        </g>
    </svg>
</div>

<style>
    div {
        width: 400px;
        height: 400px;
        outline: solid red 1px;
        background-color: white;
        color: hsl(0, 0%, 30%);
    }

    svg {
        width: 100%;
        height: 100%;
        fill: transparent;
        stroke: currentColor;
        stroke-width: 2.5;
    }
</style>

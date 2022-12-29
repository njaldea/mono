<script lang="ts">
    let length = 1;
    const action = (p: SVGPathElement, options: { length: number; fill: boolean }) => {
        const total = p.getTotalLength();
        p.style.strokeDasharray = `${total * options.length} ${total}`;
        p.style.fill = !options.fill || options.length < 1 ? "transparent" : "currentColor";
        return {
            update: (options: { length: number; fill: boolean }) => {
                const total = p.getTotalLength();
                p.style.strokeDasharray = `${total * options.length} ${total}`;
                p.style.fill = !options.fill || options.length < 1 ? "transparent" : "currentColor";
            }
        };
    };

    const d = `
        M 0 -15
        L 15 -15
        L 15 0
        L 0 0 -9 0
        A 6 8 135 0 1 9 0
    `;
</script>

<input type="range" min={0} max={1} step={0.01} bind:value={length} />
<div>
    <svg viewBox="-30 -30 60 60">
        <g transform="rotate(45 0 0)">
            <path {d} use:action={{ length, fill: false }} />
        </g>
        <g transform="rotate(225 0 0)">
            <path {d} use:action={{ length, fill: false }} />
        </g>
    </svg>
</div>

<style>
    div {
        width: 400px;
        height: 400px;
        outline: solid red 1px;
        background-color: black;
        color: hsl(0, 0%, 30%);
    }

    svg {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 2.5;
    }
</style>

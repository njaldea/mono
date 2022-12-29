<script lang="ts">
    let length = 0.5;
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

    const o = `
        M 0 0
        L 0 0 -10 0
        A 6 10 135 0 1 10 0
    `;
    const p1 = `
        M -5 -15
        A 20 23 45 0 1 15 5
        A 20 15 45 0 0 -5 -15
    `;
    const p2 = `
        M 3 -15
        L 15 -15
        L 15 -3
        L 12 -12
        Z
    `;
    const ds = [o, p1, p2];
</script>

<input type="range" min={0} max={1} step={0.01} bind:value={length} />
<div>
    <svg viewBox="-30 -30 60 60">
        <g transform="scale(1, 1) rotate(45 0 0)">
            {#each ds as d, i (i)}
                <path class={`icon-${i}`} {d} use:action={{ length, fill: i !== 0 }} />
            {/each}
        </g>
        <g transform="rotate(-135 0 0)">
            {#each ds as d, i (i)}
                <path class={`icon-${i}`} {d} use:action={{ length, fill: i !== 0 }} />
            {/each}
        </g>
    </svg>
</div>

<style>
    div {
        width: 400px;
        height: 400px;
        outline: solid red 1px;
        background-color: gray;
        color: black;
    }

    svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
    }

    path {
        transition: fill 500ms;
    }

    .icon-0 {
        stroke-width: 2;
    }

    .icon-1 {
        stroke-width: 0.2;
    }
</style>

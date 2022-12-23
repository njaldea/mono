<script lang="ts" context="module">
    // temporary to create unique ids for mask
    let indexer = 0;

    type Value = {
        rotate: number;
        mcy: number;
        cr: number;
        opacity: number;
        color: number;
    };

    const vlight: Value = {
        rotate: 40,
        mcy: -8,
        cr: 10,
        opacity: 0,
        color: 0
    };

    const vdark: Value = {
        rotate: 135,
        mcy: -24,
        cr: 5,
        opacity: 1,
        color: 100
    };
</script>

<script lang="ts">
    import { spring } from "svelte/motion";

    export let dark = true;

    const values = spring(dark ? vdark : vlight, { damping: 0.1, stiffness: 0.05 });
    $: $values = dark ? vdark : vlight;

    const index = indexer++;
</script>

<svg
    class:dark
    viewBox="-25 -25 50 50"
    style={`transform: rotate(${$values.rotate}deg); color: hsl(0, 0%, ${$values.color}%);`}
    on:click={() => (dark = !dark)}
    on:keypress={null}
>
    <mask id={`theme_icon_${index}`}>
        <rect x="-25" y="-25" width="100%" height="100%" fill="white" />
        <circle cy={$values.mcy} r="11" />
    </mask>
    <circle r={$values.cr} mask={`url(#theme_icon_${index})`} />
    <g style={`opacity: ${$values.opacity}`}>
        <g>
            <line x1="0" y1="9" x2="0" y2="11" />
            <line x1="9" y1="0" x2="11" y2="0" />
            <line x1="0" y1="-11" x2="0" y2="-9" />
            <line x1="-11" y1="0" x2="-9" y2="0" />
        </g>
        <g style="transform: rotate(45deg)">
            <line x1="0" y1="9" x2="0" y2="11" />
            <line x1="9" y1="0" x2="11" y2="0" />
            <line x1="0" y1="-11" x2="0" y2="-9" />
            <line x1="-11" y1="0" x2="-9" y2="0" />
        </g>
    </g>
</svg>

<style>
    svg {
        width: 100%;
        height: 100%;

        cursor: pointer;
        fill: currentColor;
        stroke: currentColor;

        -webkit-tap-highlight-color: transparent;
        -moz-tap-highlight-color: transparent;
        -o-tap-highlight-color: transparent;
        tap-highlight-color: transparent;
    }

    line {
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
</style>

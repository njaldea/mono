<script lang="ts" context="module">
    // temporary to create unique ids for mask
    let indexer = 0;

    type Value = {
        readonly rotate: number;
        readonly mcy: number;
        readonly cr: number;
        readonly v: number;
    };

    const vlight: Value = {
        rotate: 40,
        mcy: -8,
        cr: 10,
        v: 0
    } as const;

    const vdark: Value = {
        rotate: 180,
        mcy: -24,
        cr: 5,
        v: 1
    } as const;
</script>

<script lang="ts">
    import type { Theme } from "../context";

    import { tweened } from "svelte/motion";

    export let theme: Theme = "dark";

    $: dark = theme === "dark";

    const values = tweened(dark ? vdark : vlight);
    $: $values = dark ? vdark : vlight;

    const index = indexer++;
</script>

<svg class:dark viewBox="-25 -25 50 50" transform={`rotate(${$values.rotate})`}>
    <mask id={`nil_doc_theme_icon_${index}`}>
        <rect x="-25" y="-25" fill="white" />
        <circle cy={$values.mcy} r="11" />
    </mask>
    <circle r={$values.cr} mask={`url(#nil_doc_theme_icon_${index})`} />
    <g style={`opacity: ${$values.v}`}>
        <g>
            <line x1="0" y1="9" x2="0" y2="11" />
            <line x1="9" y1="0" x2="11" y2="0" />
            <line x1="0" y1="-11" x2="0" y2="-9" />
            <line x1="-11" y1="0" x2="-9" y2="0" />
        </g>
        <g transform="rotate(45)">
            <line x1="0" y1="9" x2="0" y2="11" />
            <line x1="9" y1="0" x2="11" y2="0" />
            <line x1="0" y1="-11" x2="0" y2="-9" />
            <line x1="-11" y1="0" x2="-9" y2="0" />
        </g>
    </g>
</svg>

<style>
    svg {
        fill: currentColor;
        stroke: currentColor;

        -webkit-tap-highlight-color: transparent;
        -moz-tap-highlight-color: transparent;
        -o-tap-highlight-color: transparent;
        /* tap-highlight-color: transparent; */
    }

    svg,
    rect {
        width: 100%;
        height: 100%;
    }

    line {
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
</style>

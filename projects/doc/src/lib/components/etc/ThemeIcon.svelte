<script lang="ts" context="module">
    // temporary to create unique ids for mask
    let indexer = 0;

    type Value = {
        rotate: number;
        mcy: number;
        cr: number;
        v: number;
    };

    const vlight: Value = {
        rotate: 40,
        mcy: -8,
        cr: 10,
        v: 0
    };

    const vdark: Value = {
        rotate: 180,
        mcy: -24,
        cr: 5,
        v: 1
    };
</script>

<script lang="ts">
    import { tweened } from "svelte/motion";
    import { elasticOut } from "svelte/easing";

    export let dark = true;

    const values = tweened(dark ? vdark : vlight, { duration: 1000, easing: elasticOut });
    $: $values = dark ? vdark : vlight;

    const index = indexer++;
</script>

<svg
    class:dark
    viewBox="-25 -25 50 50"
    transform={`rotate(${$values.rotate})`}
    style={`color: hsl(0, 0%, ${$values.v * 100}%);`}
    on:click={() => (dark = !dark)}
    on:keypress={null}
>
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
        cursor: pointer;
        fill: currentColor;
        stroke: currentColor;

        -webkit-tap-highlight-color: transparent;
        -moz-tap-highlight-color: transparent;
        -o-tap-highlight-color: transparent;
        tap-highlight-color: transparent;
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

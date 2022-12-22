<script lang="ts" context="module">
    // temporary to create unique ids for mask
    let indexer = 0;

    type Value = {
        rotate: number;
        mask: {
            cx: number;
            cy: number;
        };
        cr: number;
        opacity: number;
    };

    const vlight: Value = {
        rotate: 40,
        mask: {
            cx: 12,
            cy: 4
        },
        cr: 10,
        opacity: 0
    };

    const vdark: Value = {
        rotate: 180,
        mask: {
            cx: 30,
            cy: 0
        },
        cr: 5,
        opacity: 1
    };
</script>

<script lang="ts">
    export let dark = true;

    import { tweened } from "svelte/motion";

    const values = tweened(dark ? vdark : vlight, { duration: 350 });
    $: values.set(dark ? vdark : vlight);

    const index = indexer++;
</script>

<svg
    class:dark
    viewBox="0 0 24 24"
    style={`transform: rotate(${$values.rotate}deg)`}
    on:click={() => (dark = !dark)}
    on:keypress={null}
>
    <mask id={`theme_icon_${index}`}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx={$values.mask.cx} cy={$values.mask.cy} r="11" fill="currentColor" />
    </mask>
    <circle cx="12" cy="12" r={$values.cr} fill="currentColor" mask={`url(#theme_icon_${index})`} />

    <g style={`opacity: ${$values.opacity}`}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
</svg>

<style>
    svg {
        all: unset;
        width: 50%;
        height: 50%;
        margin: auto;

        cursor: pointer;
        color: black;
        fill: none;

        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;

        -webkit-tap-highlight-color: transparent;
        -moz-tap-highlight-color: transparent;
        -o-tap-highlight-color: transparent;
        tap-highlight-color: transparent;
    }

    svg.dark {
        color: white;
    }
</style>

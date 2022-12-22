<script lang="ts" context="module">
    // temporary to create unique ids for mask
    let indexer = 0;
</script>

<script lang="ts">
    export let dark = true;

    import { spring } from "svelte/motion";

    function iter() {
        dark = !dark;
    }

    const rotate = spring(dark ? 90 : 40);
    const mcx = spring(dark ? 30 : 12);
    const mcy = spring(dark ? 0 : 4);
    const cr = spring(dark ? 5 : 9);
    const opacity = spring(dark ? 0 : 1);

    $: rotate.set(dark ? 90 : 40);
    $: mcx.set(dark ? 30 : 12);
    $: mcy.set(dark ? 0 : 4);
    $: cr.set(dark ? 5 : 9);
    $: opacity.set(dark ? 1 : 0);

    const index = indexer++;
</script>

<svg
    on:click={iter}
    on:keypress={null}
    viewBox="0 0 24 24"
    class:dark
    style={`transform: rotate(${$rotate}deg)`}
>
    <mask id={`theme_icon_${index}`}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx={$mcx} cy={$mcy} r="9" fill="currentColor" />
    </mask>
    <circle cx="12" cy="12" r={$cr} fill="currentColor" mask={`url(#theme_icon_${index})`} />

    <g style={`opacity: ${$opacity}`}>
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
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        cursor: pointer;
        color: black;
        margin: auto;
    }

    svg.dark {
        color: white;
    }
</style>

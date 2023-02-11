<script lang="ts" context="module">
    // temporary to create unique ids for mask
    let indexer = 0;
</script>

<script lang="ts">
    import type { Theme } from "../context";
    export let theme: Theme = "dark";
    const index = indexer++;
</script>

<svg viewBox="-25 -25 50 50" class:dark={theme === "dark"}>
    <mask id={`nil_doc_theme_icon_${index}`}>
        <rect x="-25" y="-25" fill="white" />
        <circle r="11" />
    </mask>
    <circle mask={`url(#nil_doc_theme_icon_${index})`} />
    <g>
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

    svg {
        transition: transform 350ms;
        transform: rotate(40deg);
    }

    svg > g {
        transition: opacity 350ms;
        opacity: 0;
    }

    svg > mask > circle {
        transition: cy 350ms;
        cy: -8px;
    }

    svg > circle {
        transition: r 350ms;
        r: 10px;
    }

    svg.dark {
        transform: rotate(180deg);
    }

    svg.dark > g {
        opacity: 1;
    }

    svg.dark > mask > circle {
        cy: -24px;
    }

    svg.dark > circle {
        r: 5px;
    }
</style>

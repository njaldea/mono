<script lang="ts" context="module">
    // temporary to create unique ids for mask
    let indexer = 0;
</script>

<script lang="ts">
    export let dark = true;
    const index = indexer++;
</script>

<svg viewBox="-25 -25 50 50" style:transform={dark ? "rotate(40deg)" : "rotate(180deg)"}>
    <mask id={`nil_doc_theme_icon_${index}`}>
        <rect x="-25" y="-25" fill="white" />
        <circle r="11" cy={dark ? -8 : -24} fill="black" stroke="black" />
    </mask>
    <circle r={dark ? 10 : 5} mask={`url(#nil_doc_theme_icon_${index})`} />
    <g opacity={dark ? 0 : 1}>
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
        transition: transform var(--i-nil-doc-transition-time);
    }

    svg > g {
        transition: opacity var(--i-nil-doc-transition-time);
    }

    svg > mask > circle {
        transition: cy var(--i-nil-doc-transition-time);
    }

    svg > circle {
        transition: r var(--i-nil-doc-transition-time);
    }
</style>

<script lang="ts">
    export let position: "hidden" | "bottom" | "right" = "hidden";
    $: bottom = "bottom" === position;
    $: right = "right" === position;
</script>

<svg viewBox="-50 -50 100 100">
    <rect width="60" x="-30" height="60" y="-30" fill="transparent" />
    <rect width="60" x="-30" height={bottom ? "20" : "0"} y={bottom ? "10" : "30"} />
    <rect
        width="60"
        x="-30"
        height={right ? "20" : "0"}
        y={right ? "10" : "30"}
        transform="rotate(-90)"
    />
</svg>

<style>
    svg {
        stroke-width: 3;
        fill: currentColor;
    }

    rect:nth-child(n + 2) {
        transition:
            height var(--i-nil-doc-transition-time),
            x var(--i-nil-doc-transition-time),
            y var(--i-nil-doc-transition-time);
    }
</style>

<script lang="ts">
    export let position: "hidden" | "bottom" | "right" = "hidden";
</script>

<svg viewBox="-50 -50 100 100">
    <rect width="60" height="60" x="-30" y="-30" fill="transparent" />
    <rect class:show={position === "bottom"} />
    <rect class:show={position === "right"} transform="rotate(-90)" />
</svg>

<style>
    svg {
        stroke-width: 3;
        fill: currentColor;
    }

    rect:not(:first-child) {
        transition: height var(--i-nil-doc-transition-time), x var(--i-nil-doc-transition-time),
            y var(--i-nil-doc-transition-time);
        width: 60px;
        height: 0px;
        x: -30px;
        y: 30px;
    }

    rect:not(:first-child).show {
        height: 20px;
        x: -30px;
        y: 10px;
    }
</style>

<script lang="ts">
    export let mode: "props" | "events" = "props";
</script>

<svg viewBox="-50 -50 100 100">
    <rect width="60" height="60" x="-30" y="-30" fill="transparent" />
    <rect
        x={mode === "props" ? 0 : -20}
        class="mv"
        height="40"
        width="20"
        y="-20"
        rx="2"
        ry="2"
        fill="transparent"
    />
    <polygon transform="translate(5, 0)" points="-15,-2 1,-2, 1,-6 6,0 1,6 1,2 -15,2" />
</svg>

<style>
    .mv {
        transition: x var(--i-nil-doc-transition-time);
    }
</style>

<script lang="ts">
    export let x: number;
    export let y: number;
</script>

<g transform={`translate(${x} ${y})`}>
    <slot />
</g>

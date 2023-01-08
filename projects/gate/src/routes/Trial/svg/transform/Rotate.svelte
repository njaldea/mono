<script lang="ts">
    export let rotation: number;
    export let x: number;
    export let y: number;
</script>

<g transform={`rotate(${rotation} ${x} ${y})`}>
    <slot />
</g>

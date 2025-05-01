<script lang="ts">
    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

<div>
    {@render children?.()}
</div>

<style>
    div {
        width: 100%;
        box-sizing: border-box;
        min-width: min-content;
        display: inline-block;
    }
</style>

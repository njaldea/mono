<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        title,
        onclick,
        onkeypress,
        children
    }: {
        title?: string;
        onclick?: (e: MouseEvent) => void;
        onkeypress?: (e: KeyboardEvent) => void;
        children?: Snippet;
    } = $props();
</script>

<div class="icon" {onclick} {onkeypress} {title} role="none">
    {@render children?.()}
</div>

<style>
    div {
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
        transition: transform var(--i-nil-doc-transition-time);
    }

    div:hover {
        transform: scale(1.5);
    }
</style>

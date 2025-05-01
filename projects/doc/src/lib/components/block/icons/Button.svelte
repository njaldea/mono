<script lang="ts">
    import type { Snippet } from "svelte";
    let {
        title = "",
        scale = false,
        onclick,
        onkeypress,
        children
    } = $props<{
        title?: string;
        scale?: boolean;
        onclick?: (e: MouseEvent) => void;
        onkeypress?: (e:  KeyboardEvent) => void;
        children?: Snippet
    }>();
</script>

<div onclick={onclick} onkeypress={onkeypress} role="none" {title} class:scale>
    {@render children?.()}
</div>

<style>
    div {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        transition: transform var(--i-nil-doc-transition-time);
    }

    div.scale:hover {
        transform: scale(1.5);
    }

    div > :global(svg) {
        width: 100%;
        height: 100%;
        stroke-width: 3;
        stroke: currentColor;
        fill: currentColor;
    }
</style>

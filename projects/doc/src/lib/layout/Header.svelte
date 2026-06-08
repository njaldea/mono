<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        title,
        title_misc,
    }: {
        title: Snippet;
        title_misc: Snippet;
    } = $props();
</script>

<div class="top">
    <div class="title">
        {@render title()}
    </div>
    {@render title_misc()}
</div>

<style>
    .top {
        overflow: hidden;
        font-size: 1rem;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 2.5rem;
        grid-template-columns: 1fr;
        align-items: center;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        user-select: none;
        transition: border-bottom-color var(--i-nil-doc-transition-time);
        border-bottom-color: var(--i-nil-doc-container-p);
    }

    .title {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        justify-content: left;
        gap: 0.25rem;
    }
</style>

<script lang="ts">
    import ThemeToggle from "./ThemeToggle.svelte";
    import type { Snippet } from "svelte";

    let {
        title,
        title_misc,
        theme = $bindable()
    }: {
        title: Snippet;
        title_misc?: Snippet;
        theme?: "light" | "dark";
    } = $props();
</script>

<div class="top">
    <div class="title">
        {@render title()}
    </div>
    {#if title_misc}
        {@render title_misc()}
    {:else}
        <ThemeToggle bind:theme />
    {/if}
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

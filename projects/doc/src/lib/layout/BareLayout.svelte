<script lang="ts">
    import Base from "../Base.svelte";
    import { type Snippet } from "svelte";

    let {
        dark = $bindable(),
        header,
        body
    }: {
        dark: boolean;
        header: Snippet;
        body: Snippet;
    } = $props();
</script>

<Base {dark} fill>
    <div class="layout">
        {@render header()}
        {@render body()}
    </div>
</Base>

<style>
    .layout {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: minmax(2.5rem, auto) 1fr;
        color-scheme: var(--i-nil-doc-color-scheme);
        color: var(--i-nil-doc-color);
        background-color: var(--i-nil-doc-bg-color);
        transition:
            color var(--i-nil-doc-transition-time),
            background-color var(--i-nil-doc-transition-time);
    }
</style>

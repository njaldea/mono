<script lang="ts">
    import Base from "../Base.svelte";
    import { fromStore } from "svelte/store";
    import { untrack, type Snippet } from "svelte";
    import { getTheme, initTheme, type Theme } from "../context";

    let {
        theme = $bindable("dark"),
        header,
        body
    }: {
        theme?: Theme;
        header: Snippet;
        body: Snippet;
    } = $props();
    
    const parent_theme = fromStore(getTheme());
    const dark = fromStore(initTheme());

    $effect(() => {
        theme;
        parent_theme.current;
        untrack(() => {
            if (theme === undefined) {
                dark.current = parent_theme.current;
            } else {
                dark.current = "dark" === theme;
            }
        });
    });
</script>

<Base dark={dark.current} fill>
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

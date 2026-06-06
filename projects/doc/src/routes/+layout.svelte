<script lang="ts" module>
    declare const __VERSION__: string;
</script>

<script lang="ts">
    import { DocLayout, Content, renamer, sorter } from "$lib";
    import { build } from "@nil-/doc-kit";
    import Icon from "$lib/components/layout/icons/Icon.svelte";
    import Nil from "$lib/components/layout/icons/Nil.svelte";
    import { setContext, type Snippet } from "svelte";

    const settings = build(import.meta.glob(["./**/+page.svelte", "./**/+page.svx"]));
    setContext("urls", settings.data);

    let { children }: { children?: Snippet } = $props();
</script>

<svelte:head>
    <title>@nil-/doc</title>
    <link
        href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.min.css"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="/assets/markdown.css" />
    <link rel="stylesheet" href="/assets/admonitions.css" />
</svelte:head>

<DocLayout {settings} {renamer} {sorter}>
    {#snippet title()}
        <Icon
            title="Open @nil-/mono repo: https://github.com/njaldea/mono"
            onclick={() => window.open("https://github.com/njaldea/mono", "_blank")}
        >
            <Nil />
        </Icon>
        <span>@nil-/doc {__VERSION__}</span>
    {/snippet}
    <Content>
        <div class="markdown-body">
            {@render children?.()}
        </div>
    </Content>
</DocLayout>

<style>
    .markdown-body {
        min-width: 600px;
        max-width: 1000px;
        width: 100%;
        margin-top: 0.7rem;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        transition: background-color 350ms;
        background-color: transparent !important;
    }

    .markdown-body :global(pre) {
        transition: background-color 350ms;
    }

    .markdown-body :global(table) {
        margin: 0;
    }
</style>

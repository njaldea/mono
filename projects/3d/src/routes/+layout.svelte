<script lang="ts">
    import { DocLayout, Content, renamer, sorter, Icon, Nil } from "@nil-/doc";
    import { build } from "@nil-/doc-kit";

    const settings = build(import.meta.glob(["./**/+page.svelte", "./**/+page.mdsvelte"]));

    let { children } = $props();
</script>

<svelte:head>
    <title>@nil-/3d</title>
    <link
        href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.min.css"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="/assets/markdown.css" />
</svelte:head>

<DocLayout {settings} {sorter} {renamer}>
    {#snippet title()}
        <Icon
            title="Open @nil-/mono repo: https://github.com/njaldea/mono"
            onclick={() => window.open("https://github.com/njaldea/mono", "_blank")}
        >
            <Nil />
        </Icon>
        <span>@nil-/3d</span>
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
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        transition: background-color 350ms;
        background-color: transparent !important;
    }

    .markdown-body :global(pre) {
        transition: background-color 350ms;
    }
</style>

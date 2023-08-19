<script lang="ts" context="module">
    declare const __VERSION__: string;
    const version = `v${__VERSION__}`;
</script>

<script lang="ts">
    import { DocLayout, renamer, sorter, Icon, Nil } from "@nil-/doc";
    import { build } from "@nil-/doc-kit";

    const settings = build(import.meta.glob(["./**/+page.svelte", "./**/+page.mdsvelte"]));
</script>

<svelte:head>
    <title>@nil-/jwalk</title>
    <link
        href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.min.css"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="/assets/markdown.css" />
</svelte:head>

<DocLayout {settings} {sorter} {renamer}>
    <svelte:fragment slot="title">
        <Icon
            title="Open @nil-/mono repo: https://github.com/njaldea/mono"
            on:click={() => window.open("https://github.com/njaldea/mono", "_blank")}
        >
            <Nil />
        </Icon>
        <span>@nil-/jwalk {version}</span>
    </svelte:fragment>
    <div class="markdown-body">
        <slot />
    </div>
</DocLayout>

<style>
    .markdown-body {
        display: flex;
        flex-direction: column;
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

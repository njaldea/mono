<script lang="ts" context="module">
    declare const __VERSION__: string;
    const version = __VERSION__;
</script>

<script lang="ts">
    import { Layout, renamer, sorter } from "$lib";
    import { sveltekit } from "$lib/sveltekit";
    import Icon from "$lib/components/layout/icons/Icon.svelte";
    import Nil from "$lib/components/layout/icons/Nil.svelte";

    const { data, current, navigate, theme, offset, panel } = sveltekit(
        import.meta.glob(["./**/+page.svelte", "./**/+page.mdsvelte"])
    );

    import { setContext } from "svelte";
    setContext("urls", data);
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

<Layout
    {data}
    {sorter}
    {renamer}
    current={$current}
    bind:theme={$theme}
    bind:offset={$offset}
    bind:panel={$panel}
    on:navigate={navigate}
>
    <svelte:fragment slot="title">
        <Icon
            title="Open @nil-/mono repo: https://github.com/njaldea/mono"
            on:click={() => window.open("https://github.com/njaldea/mono", "_blank")}
        >
            <Nil />
        </Icon>
        <span>@nil-/doc {version}</span>
    </svelte:fragment>
    <div class="markdown-body">
        <slot />
    </div>
</Layout>

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

<script lang="ts">
    import { Layout, renamer, sorter, Icon, Nil } from "@nil-/doc";
    import { sveltekit } from "@nil-/doc/sveltekit";

    const { data, current, navigate, theme, offset } = sveltekit(
        import.meta.glob(["./**/+page.svelte", "./**/+page.mdsvelte"])
    );
</script>

<svelte:head>
    <title>@nil-/3d</title>
    <link
        href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.min.css"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="/assets/markdown.css" />
</svelte:head>

<Layout
    {data}
    {sorter}
    {renamer}
    current={$current}
    bind:theme={$theme}
    bind:offset={$offset}
    on:navigate={navigate}
>
    <svelte:fragment slot="title">
        <Icon
            title="Open @nil-/mono repo: https://github.com/njaldea/mono"
            on:click={() => window.open("https://github.com/njaldea/mono", "_blank")}
        >
            <Nil />
        </Icon>
        <span>@nil-/3d</span>
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

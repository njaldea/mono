<script lang="ts">
    import { Layout, renamer, sorter, Icon, NilDoc } from "@nil-/doc";
    import { sveltekit } from "@nil-/doc/sveltekit";

    const { data, current, navigate, theme } = sveltekit(
        import.meta.glob(["./**/+page.svelte", "./**/+page.mdsvelte"], { eager: true })
    );
</script>

<svelte:head>
    <title>@nil-/gate</title>
    <link
        href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.min.css"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="/assets/markdown.css" />
</svelte:head>

<Layout {data} current={$current} on:navigate={navigate} {renamer} {sorter} bind:theme={$theme}>
    <svelte:fragment slot="title">
        <Icon
            title="Open @nil-/mono repo: https://github.com/njaldea/mono"
            on:click={() => window.open("https://github.com/njaldea/mono", "_blank")}
        >
            <NilDoc />
        </Icon>
        <span>@nil-/gate</span>
    </svelte:fragment>
    <div class="markdown-body">
        <slot />
    </div>
</Layout>

<style>
    .markdown-body {
        width: 100%;
        height: 100%;
        padding: 10px;
        min-width: 600px;
        max-width: 1500px;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        transition: background-color 350ms, color 350ms;
        background-color: transparent !important;
    }
</style>

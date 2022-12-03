<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { load, Layout, renamer, sorter } from "$lib";
</script>

<svelte:head>
    <title>@nil-/doc</title>
    <link
        href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css"
        rel="stylesheet"
    />
</svelte:head>

<Layout
    data={load(import.meta.glob("./**/+page.svelte", { eager: true }))}
    current={$page.route.id}
    {renamer}
    {sorter}
    on:navigate={(e) => goto(e.detail)}
>
    <svelte:fragment slot="title">@nil-/doc</svelte:fragment>
    <svelte:fragment slot="content">
        <div class="markdown-body nil-doc-scrollable">
            <slot />
        </div>
    </svelte:fragment>
</Layout>

<style>
    @import "./markdown.css";
    @import "$lib/styles/scrollable.css";

    .markdown-body {
        padding: 10px;
    }
</style>

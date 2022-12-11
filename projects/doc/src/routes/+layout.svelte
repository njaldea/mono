<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { Layout, routes, renamer, sorter } from "$lib";

    const { data, process } = routes(import.meta.glob("./**/+page.svelte", { eager: true }));
</script>

<svelte:head>
    <title>@nil-/doc</title>
    <link
        href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css"
        rel="stylesheet"
    />
</svelte:head>

<Layout
    {data}
    current={process($page.route.id)}
    on:navigate={(e) => goto(e.detail)}
    {renamer}
    {sorter}
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
        width: 100%;
        height: 100%;
        padding: 10px;
    }
</style>

<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { Layout, routes, renamer, sorter } from "@nil-/doc";

    const { data, process } = routes(import.meta.glob("./**/+page.svelte", { eager: true }));
</script>

<svelte:head>
    <title>@nil-/3d</title>
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
    <svelte:fragment slot="title">@nil-/3d</svelte:fragment>
    <svelte:fragment slot="content">
        <div class="markdown-body scrollable">
            <slot />
        </div>
    </svelte:fragment>
</Layout>

<style>
    @import "./markdown.css";

    .markdown-body {
        width: 100%;
        height: 100%;
        padding: 10px;
    }

    .scrollable {
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    .scrollable::-webkit-scrollbar {
        display: none;
    }
</style>

<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { load, Layout, renamer, sorter } from "$lib";

    import "$lib/styles/scrollable.css";
    import "./markdown.css";
</script>

<svelte:head>
    <title>@nil-/doc</title>
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
        <div class="markdown-body scrollable">
            <slot />
        </div>
    </svelte:fragment>
</Layout>

<style>
    .markdown-body {
        padding: 10px;
    }
</style>

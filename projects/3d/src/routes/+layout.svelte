<script lang="ts">
    import { Layout, renamer, sorter } from "@nil-/doc";
    import { sveltekit } from "@nil-/doc/sveltekit";

    const { data, current, navigate } = sveltekit(
        import.meta.glob("./**/+page.svelte", { eager: true })
    );
</script>

<svelte:head>
    <title>@nil-/3d</title>
    <link
        href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.min.css"
        rel="stylesheet"
    />
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css"
        integrity="sha512-KUoB3bZ1XRBYj1QcH4BHCQjurAZnCO3WdrswyLDtp7BMwCw7dPZngSLqILf68SGgvnWHTD5pPaYrXi6wiRJ65g=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
    />
</svelte:head>

<Layout {data} current={$current} on:navigate={navigate} {renamer} {sorter}>
    <svelte:fragment slot="title">@nil-/3d</svelte:fragment>
    <svelte:fragment slot="content">
        <div class="markdown-body scrollable">
            <slot />
        </div>
    </svelte:fragment>
</Layout>

<style>
    .markdown-body {
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
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

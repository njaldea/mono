<script lang="ts">
    import { Layout, renamer, sorter } from "$lib";
    import { sveltekit } from "$lib/sveltekit";

    const { data, current, navigate } = sveltekit(
        import.meta.glob("./**/+page.svelte", { eager: true })
    );

    let dark = true;
</script>

<svelte:head>
    <title>@nil-/doc</title>
    <link
        href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.min.css"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="/assets/markdown.css" />
</svelte:head>

<Layout
    {data}
    current={$current}
    on:navigate={navigate}
    {renamer}
    {sorter}
    theme={dark ? "dark" : "light"}
>
    <svelte:fragment slot="title">
        <div on:click={() => (dark = !dark)} on:keypress={null} class="title">@nil-/doc</div>
    </svelte:fragment>
    <div class="markdown-body scrollable">
        <slot />
    </div>
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

    .title {
        user-select: none;
    }
</style>

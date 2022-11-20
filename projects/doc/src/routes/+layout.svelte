<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { load, Layout } from "$lib";
</script>

<Layout
    data={load(import.meta.glob("./**/+page.svelte", { eager: true }))}
    current={$page.route.id}
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
        height: 100%;
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

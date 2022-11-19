<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { load, Layout } from "@nil-/doc";
</script>

<Layout
    data={load(import.meta.glob("./**/+page.svelte", { eager: true }))}
    current={$page.route.id}
    on:navigate={(e) => goto(e.detail)}
>
    <svelte:fragment slot="title">@nil-/3d</svelte:fragment>
    <svelte:fragment slot="content">
        <slot />
    </svelte:fragment>
</Layout>

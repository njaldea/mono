<script lang="ts">
    import { type Data, Layout } from "$lib";
    export let data: Data;
</script>

<Layout {data}>
    <svelte:fragment slot="title">@nil-/doc</svelte:fragment>
    <svelte:fragment slot="content">
        <slot />
    </svelte:fragment>
</Layout>

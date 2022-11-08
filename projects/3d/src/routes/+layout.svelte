<script lang="ts">
    import { type Data, Layout } from '@nil-/doc';
    export let data: Data;
</script>

<Layout {data}>
    <svelte:fragment slot="content">
        <slot />
    </svelte:fragment>
</Layout>

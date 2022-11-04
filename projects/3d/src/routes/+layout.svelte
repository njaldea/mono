<script lang="ts">
    import { type Data, Layout } from '@nil-/doc';
    export let data: Data;
</script>

<Layout {data}>
    <svelte:fragment slot="content">
        <div>
            <slot />
        </div>
    </svelte:fragment>
</Layout>

<style>
    div {
        color: white;
    }
</style>

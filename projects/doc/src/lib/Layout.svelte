<script lang="ts">
    import { page } from '$app/stores';

    import Container from './etc/Container.svelte';
    import Content from './layout/content/Content.svelte';
    import Nav from './layout/navigation/Nav.svelte';

    import type { Data } from '.';
    export let data: Data;
</script>

<div>
    {#if $page.route.id != null}
        <Container offset={250} padding={250} vertical>
            <svelte:fragment slot="a">
                <Nav info={data.routes} selected={$page.route.id} />
            </svelte:fragment>
            <svelte:fragment slot="b">
                <Content url={$page.route.id}>
                    <slot name="content" />
                </Content>
            </svelte:fragment>
        </Container>
    {/if}
</div>

<style>
    div {
        width: 100%;
        height: 100%;
        background-color: rgb(34, 36, 37);
        color: rgb(201, 205, 207);
    }
</style>

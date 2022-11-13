<script lang="ts">
    import { page } from "$app/stores";

    import Container from "$lib/etc/Container.svelte";
    import Content from "$lib/layout/content/Content.svelte";
    import Nav from "$lib/layout/navigation/Nav.svelte";

    import { writable, type Writable } from "svelte/store";
    import type { PropValues } from "$lib/context";

    let props: Record<string, Writable<Record<string, PropValues>>> = {};

    function getProps(u: string) {
        if (props[u] === undefined) {
            props[u] = writable({});
        }
        return props[u];
    }

    import type { Data } from "$lib/types/data";
    export let data: Data;
</script>

<div class="wrapper">
    {#if $page.route.id != null}
        <Container offset={250} padding={250} vertical>
            <svelte:fragment slot="a">
                <Nav info={data.routes} selected={$page.route.id} />
            </svelte:fragment>
            <svelte:fragment slot="b">
                <div class="content">
                    {#key $page.route.id}
                        <Content props={getProps($page.route.id)}>
                            <slot name="content" />
                        </Content>
                    {/key}
                </div>
            </svelte:fragment>
        </Container>
    {/if}
</div>

<style>
    div {
        width: 100%;
        height: 100%;
    }

    .wrapper {
        overflow: hidden;
        background-color: rgb(34, 36, 37);
        color: rgb(201, 205, 207);
    }
</style>

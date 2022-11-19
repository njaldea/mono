<script lang="ts" context="module">
    export function load(files_from_import_meta: Record<string, unknown>) {
        const prefix = ".".length;
        const suffix = "/+page.svelte".length;
        const rootlen = "./+page.svelte".length;
        const routes = Object.keys(files_from_import_meta)
            .filter((p) => p.length > rootlen) // remove root page
            .map((p) => p.substring(prefix, p.length - suffix));
        return { routes };
    }
</script>

<script lang="ts">
    import Container from "./etc/Container.svelte";
    import Nav from "./navigation/Nav.svelte";

    import type { Data } from "./types";
    export let data: Data;
    export let current: string | null;
</script>

<div class="wrapper">
    {#if current != null}
        <Container offset={250} padding={250} vertical>
            <svelte:fragment slot="a">
                <Nav info={data.routes} selected={current} on:navigate>
                    <slot name="title">@nil-/doc</slot>
                </Nav>
            </svelte:fragment>
            <svelte:fragment slot="b">
                <div class="content">
                    {#key current}
                        <slot name="content" />
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

    .content {
        padding: 5px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    .content::-webkit-scrollbar {
        display: none;
    }
</style>

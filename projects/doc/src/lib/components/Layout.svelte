<script lang="ts" context="module">
    type Data = string[];

    export function load(files_from_import_meta: Record<string, unknown>): Data {
        const prefix = ".".length;
        const suffix = "/+page.svelte".length;
        const rootlen = "./+page.svelte".length;
        return Object.keys(files_from_import_meta)
            .filter((p) => p.length > rootlen) // remove root page
            .map((p) => p.substring(prefix, p.length - suffix));
    }
</script>

<script lang="ts">
    import Container from "./etc/Container.svelte";
    import Nav from "./navigation/Nav.svelte";

    export let data: Data;
    export let current: string | null;
</script>

<div class="wrapper">
    <Container offset={250} padding={250} vertical>
        <svelte:fragment slot="a">
            <Nav info={data} selected={current ?? ""} on:navigate>
                <slot name="title">@nil-/doc</slot>
            </Nav>
        </svelte:fragment>
        <svelte:fragment slot="b">
            <div class="content scrollable">
                {#key current}
                    <slot name="content" />
                {/key}
            </div>
        </svelte:fragment>
    </Container>
</div>

<style>
    .wrapper {
        width: 100%;
        height: 100%;
    }

    .wrapper {
        overflow: hidden;
        background-color: rgb(34, 36, 37);
        color: rgb(201, 205, 207);
    }

    .content {
        height: 100%;
        padding: 5px;
        display: flex;
        flex-direction: column;
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

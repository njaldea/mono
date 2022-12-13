<script lang="ts">
    import Container from "./etc/Container.svelte";
    import Nav from "./navigation/Nav.svelte";

    import type { Sorter, Renamer } from "./navigation/types";

    import { inRoot } from "./context";

    export let data: string[];
    export let current: string | null = null;

    export let sorter: Sorter | null = null;
    export let renamer: Renamer | null = null;

    const r = inRoot();
</script>

<div class="layout" class:reset={r}>
    <Container offset={250} padding={250} vertical secondary>
        <svelte:fragment slot="primary">
            <div class="content scrollable">
                <Nav
                    info={data}
                    selected={current ?? ""}
                    sorter={sorter ?? ((l, r) => (l === r ? 0 : l < r ? -1 : +1))}
                    renamer={renamer ?? ((s) => s)}
                    on:navigate
                >
                    <slot name="title">@nil-/doc</slot>
                </Nav>
            </div>
        </svelte:fragment>
        <svelte:fragment slot="secondary">
            <div class="content scrollable">
                {#key current}
                    <slot name="content" />
                {/key}
            </div>
        </svelte:fragment>
    </Container>
</div>

<style>
    .layout {
        width: 100%;
        height: 100%;
        color: rgb(201, 205, 207);
        background-color: rgb(34, 36, 37);
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }

    .content {
        height: 100%;
        padding: 5px;
        display: flex;
        flex-direction: column;
    }

    /* reset block */
    @font-face {
        font-family: "Fira Code";
        src: url("https://fonts.googleapis.com/css?family=Fira Code");
    }

    .reset {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }

    .reset :global(*),
    .reset :global(*::before),
    .reset :global(*::after) {
        box-sizing: inherit;
    }

    /* scrollable */
    .scrollable {
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    .scrollable::-webkit-scrollbar {
        display: none;
    }
</style>

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

<div class="layout" class:nil-doc-reset={r}>
    <Container offset={250} padding={250} vertical>
        <svelte:fragment slot="a">
            <Nav
                info={data}
                selected={current ?? ""}
                sorter={sorter ?? ((l, r) => (l === r ? 0 : l < r ? -1 : +1))}
                renamer={renamer ?? ((s) => s)}
                on:navigate
            >
                <slot name="title">@nil-/doc</slot>
            </Nav>
        </svelte:fragment>
        <svelte:fragment slot="b">
            <div class="content nil-doc-scrollable">
                {#key current}
                    <slot name="content" />
                {/key}
            </div>
        </svelte:fragment>
    </Container>
</div>

<style>
    @import "../styles/reset.css";
    @import "../styles/scrollable.css";

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
</style>

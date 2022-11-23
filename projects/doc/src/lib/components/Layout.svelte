<script lang="ts">
    import Container from "./etc/Container.svelte";
    import Nav from "./navigation/Nav.svelte";
    import Font from "./etc/Font.svelte";

    import type { Sorter, Renamer } from "./navigation/types";

    export let data: string[];
    export let current: string | null = null;

    export let sorter: Sorter | null = null;
    export let renamer: Renamer | null = null;
</script>

<Font />

<div class="wrapper">
    <Container offset={250} padding={250} vertical>
        <svelte:fragment slot="a">
            <Nav
                info={data}
                selected={current ?? ""}
                sorter={sorter ?? ((l, r) => (l < r ? -1 : l > r ? +1 : 0))}
                renamer={renamer ?? ((s) => s)}
                on:navigate
            >
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
        font-family: "Fira Code", "Courier New", Courier, monospace;
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

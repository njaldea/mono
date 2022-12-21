<script lang="ts">
    import Container from "./etc/Container.svelte";
    import Nav from "./navigation/Nav.svelte";

    import type { Sorter, Renamer } from "./navigation/types";

    import { inRoot, getTheme, initTheme, evalTheme, type Theme } from "$lib/components/context";

    export let data: string[];
    export let current: string | null = null;

    export let sorter: Sorter | null = null;
    export let renamer: Renamer | null = null;
    export let theme: Theme = undefined;

    const r = inRoot();
    const parentTheme = getTheme();
    const isDark = initTheme();
    $: $isDark = evalTheme(parentTheme ? $parentTheme : true, theme);
</script>

<div class="layout" class:reset={r} class:dark={$isDark}>
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
                    <slot />
                {/key}
            </div>
        </svelte:fragment>
    </Container>
</div>

<style>
    .layout {
        width: 100%;
        height: 100%;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }

    .content {
        height: 100%;
        padding: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    /* reset block */
    @import url("https://fonts.googleapis.com/css?family=Fira%20Code");

    .reset {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-family: "Fira Code", "Courier New", Courier, monospace;
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

    /* colors */
    .layout {
        background-color: hsl(0, 0%, 100%);
        color: hsl(0, 100%, 0%);
        color-scheme: light;
    }

    .layout.dark {
        background-color: hsl(200, 4%, 14%);
        color: hsl(200, 6%, 80%);
        color-scheme: dark;
    }
</style>

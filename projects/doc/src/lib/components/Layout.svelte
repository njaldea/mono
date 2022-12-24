<script lang="ts" context="module">
    import type { Sorter, Renamer } from "./navigation/types";

    type ThreeWay = -1 | 0 | 1;
    const defaultSorter: Sorter = (l, r) => l.localeCompare(r) as ThreeWay;
</script>

<script lang="ts">
    import Container from "./etc/Container.svelte";
    import Nav from "./navigation/Nav.svelte";

    import { inRoot, getTheme, initTheme, evalTheme, type Theme } from "$lib/components/context";
    import ThemeIcon from "./etc/ThemeIcon.svelte";

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
    <div class="top">
        <slot name="title"><span>@nil-/doc</span></slot>
        <ThemeIcon bind:dark={$isDark} />
    </div>
    <Container offset={250} vertical secondary>
        <svelte:fragment slot="primary">
            <div class="content scrollable">
                <Nav
                    info={data}
                    selected={current ?? ""}
                    sorter={sorter ?? defaultSorter}
                    renamer={renamer ?? ((s) => s)}
                    on:navigate
                />
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
    @import url("https://fonts.googleapis.com/css?family=Fira%20Code");

    .layout {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: minmax(40px, auto) 1fr;
        width: 100%;
        height: 100%;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }

    .top {
        display: grid;
        grid-template-columns: 1fr 40px;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
        user-select: none;
    }

    .content {
        height: 100%;
        padding: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    /* reset block */
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
        transition: color 350ms, background-color 350ms;
        background-color: hsl(0, 0%, 100%);
        color: hsl(0, 100%, 0%);
        color-scheme: light;
    }

    .layout > .top {
        border-bottom: hsl(0, 2%, 70%) solid 1px;
    }

    .layout.dark > .top {
        border-bottom: hsl(0, 2%, 38%) solid 1px;
    }

    .layout.dark {
        background-color: hsl(200, 4%, 14%);
        color: hsl(200, 6%, 80%);
        color-scheme: dark;
    }
</style>

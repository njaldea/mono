<script lang="ts" context="module">
    import type { Sorter, Renamer } from "./navigation/types";

    type ThreeWay = -1 | 0 | 1;
    const defaultSorter: Sorter = (l, r) => l.localeCompare(r) as ThreeWay;
</script>

<script lang="ts">
    import Container from "./etc/Container.svelte";
    import Nav from "./navigation/Nav.svelte";

    import { getTheme, initTheme, type Theme } from "./context";
    import ThemeIcon from "./etc/ThemeIcon.svelte";
    import NilIcon from "./etc/NilIcon.svelte";

    export let data: string[];
    export let current: string | null = null;

    export let sorter: Sorter | null = null;
    export let renamer: Renamer | null = null;
    export let theme: Theme = undefined;

    const parentTheme = getTheme();
    const dark = initTheme();
    $: $dark = theme === undefined ? $parentTheme : "dark" === theme;
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/1-Layout) for more details.
-->

<div class="layout" class:dark={$dark}>
    <div class="top">
        <slot name="title"><span>@nil-/doc</span></slot>
        <div class="icon" on:click={() => ($dark = !$dark)} on:keypress={null}>
            <ThemeIcon bind:dark={$dark} />
        </div>
        <div
            class="icon"
            title="Double click to open repo: https://github.com/njaldea/mono"
            on:dblclick={() => window.open("https://github.com/njaldea/mono", "_blank")}
        >
            <NilIcon />
        </div>
    </div>
    <div class="main">
        <Container offset={250} vertical b>
            <svelte:fragment slot="A">
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
            <svelte:fragment slot="B">
                <div class="content scrollable">
                    {#key current}
                        <slot />
                    {/key}
                </div>
            </svelte:fragment>
        </Container>
    </div>
</div>

<style>
    @import url("https://fonts.googleapis.com/css?family=Fira%20Code");

    .layout {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: minmax(40px, auto) 1fr;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }

    .top {
        display: grid;
        grid-template-columns: 1fr 40px 40px;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        box-sizing: border-box;
        user-select: none;
    }

    .main {
        height: 100%;
        overflow: hidden;
    }

    .icon {
        width: 100%;
        height: 100%;
        transition: transform 350ms;
    }

    .icon:hover {
        transform: scale(1.5);
    }

    .content {
        height: 100%;
        padding: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
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
        color-scheme: light;
        color: hsl(0, 0%, 0%);
        background-color: hsl(0, 0%, 100%);
        transition: color 350ms, background-color 350ms;
    }

    .layout.dark {
        color-scheme: dark;
        color: hsl(0, 0%, 80%);
        background-color: hsl(200, 4%, 14%);
    }

    .layout > .top {
        transition: border-bottom-colo 350ms;
        border-bottom-color: hsl(0, 2%, 70%);
    }

    .layout.dark > .top {
        border-bottom-color: hsl(0, 2%, 40%);
    }
</style>

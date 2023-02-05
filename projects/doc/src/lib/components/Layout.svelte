<script lang="ts" context="module">
    import type { Sorter, Renamer } from "./navigation/types";

    type ThreeWay = -1 | 0 | 1;
    const defaultSorter: Sorter = (l, r) => l.localeCompare(r) as ThreeWay;
    const defaultRenamer: Renamer = (s) => s;
</script>

<script lang="ts">
    import Container from "./etc/Container.svelte";
    import Nav from "./navigation/Nav.svelte";
    import Icon from "./title/Icon.svelte";

    import { getTheme, initTheme, type Theme } from "./context";
    import ThemeIcon from "./icons/Theme.svelte";
    import Wrapper from "./etc/Wrapper.svelte";

    export let data: string[];
    export let current: string | null = null;

    export let sorter: Sorter | null = null;
    export let renamer: Renamer | null = null;
    export let theme: Theme = undefined;

    const parentTheme = getTheme();
    const dark = initTheme();
    $: $dark = theme === undefined ? $parentTheme : "dark" === theme;

    const toggle = () => {
        // only update theme if something from outside might have bound to it
        // if not, updating it is not necessary and we can simply update the
        // store which is propaged to the children
        if (theme !== undefined) {
            theme = $dark ? "light" : "dark";
        } else {
            $dark = !$dark;
        }
    };
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/1-Layout) for more details.
-->

<div class="fill layout" class:dark={$dark}>
    <div class="top">
        <div class="title">
            <slot name="title" />
        </div>
        <slot name="title-misc">
            <Icon on:click={toggle}>
                <ThemeIcon {theme} />
            </Icon>
        </slot>
    </div>
    <div class="fill main">
        <Container offset={250} vertical b>
            <svelte:fragment slot="A">
                <div class="fill content">
                    <Nav
                        info={data}
                        selected={current ?? ""}
                        sorter={sorter ?? defaultSorter}
                        renamer={renamer ?? defaultRenamer}
                        on:navigate
                    />
                </div>
            </svelte:fragment>
            <svelte:fragment slot="B">
                <Wrapper dark={$dark}>
                    {#key current}
                        <slot />
                    {/key}
                </Wrapper>
            </svelte:fragment>
        </Container>
    </div>
</div>

<style>
    @import url("https://fonts.googleapis.com/css?family=Fira%20Code");

    .fill {
        width: 100%;
        height: 100%;
    }

    .layout {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: minmax(2.5rem, auto) 1fr;
        box-sizing: border-box;
        font-family: "Fira Code", "Courier New", Courier, monospace;
    }

    .top {
        overflow: hidden;
        font-size: 1rem;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 2.5rem;
        grid-template-columns: 1fr;
        align-items: center;
        padding-left: 0.625rem;
        padding-right: 0.625rem;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        box-sizing: border-box;
        user-select: none;
    }

    .title {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        justify-content: left;
        gap: 0.3125rem;
    }

    .main {
        overflow: hidden;
    }

    .content {
        font-size: 1rem;
        padding: 0.25rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    /* colors */
    .layout {
        color-scheme: light;
        color: hsl(0, 0%, 0%);
        background-color: hsl(0, 0%, 98%);
        transition: color 350ms, background-color 350ms;
    }

    .layout.dark {
        color-scheme: dark;
        color: hsl(0, 0%, 80%);
        background-color: hsl(200, 4%, 7%);
    }

    .layout > .top {
        transition: border-bottom-color 350ms;
        border-bottom-color: hsl(0, 2%, 70%);
    }

    .layout.dark > .top {
        border-bottom-color: hsl(0, 2%, 40%);
    }
</style>

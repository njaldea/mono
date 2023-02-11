<script lang="ts" context="module">
    import type { Sorter, Renamer } from "./navigation/types";

    type ThreeWay = -1 | 0 | 1;
    const defaultSorter: Sorter = (l, r) => l.localeCompare(r) as ThreeWay;
    const defaultRenamer: Renamer = (s) => s;
</script>

<script lang="ts">
    import Base from "./etc/Base.svelte";
    import Container from "./etc/Container.svelte";
    import Nav from "./navigation/Nav.svelte";
    import Icon from "./title/Icon.svelte";

    import { getTheme, initTheme, type Theme } from "./context";
    import ThemeIcon from "./icons/Theme.svelte";

    import Content from "./etc/Content.svelte";
    import Scrollable from "./etc/Scrollable.svelte";
    import VerticalPanel from "./etc/VerticalPanel.svelte";

    export let data: string[];
    export let current: string | null = null;

    export let sorter: Sorter | null = null;
    export let renamer: Renamer | null = null;
    export let theme: Theme = undefined;
    export let offset = 250;

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

<Base dark={$dark}>
    <div class="fill layout">
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
        <Container bind:offset vertical b>
            <svelte:fragment slot="A">
                <Scrollable>
                    <VerticalPanel>
                        <Nav
                            info={data}
                            selected={current ?? ""}
                            sorter={sorter ?? defaultSorter}
                            renamer={renamer ?? defaultRenamer}
                            on:navigate
                        />
                    </VerticalPanel>
                </Scrollable>
            </svelte:fragment>
            <svelte:fragment slot="B">
                <Scrollable>
                    <Content>
                        {#key current}
                            <slot />
                        {/key}
                    </Content>
                </Scrollable>
            </svelte:fragment>
        </Container>
    </div>
</Base>

<style>
    .fill {
        width: 100%;
        height: 100%;
    }

    .layout {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: minmax(2.5rem, auto) 1fr;
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
        user-select: none;
    }

    .title {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        justify-content: left;
        gap: 0.3125rem;
    }

    .layout {
        color-scheme: var(--i-nil-doc-color-scheme);
        color: var(--i-nil-doc-color);
        background-color: var(--i-nil-doc-bg-color);
        transition: color var(--i-nil-doc-transition-time),
            background-color var(--i-nil-doc-transition-time);
    }

    .layout > .top {
        transition: border-bottom-color var(--i-nil-doc-transition-time);
        border-bottom-color: var(--i-nil-doc-container-p);
    }
</style>

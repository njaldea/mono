<script lang="ts" context="module">
    import type { Sorter, Renamer } from "../navigation/types";

    type ThreeWay = -1 | 0 | 1;
    const defaultSorter: Sorter = (l, r) => l.localeCompare(r) as ThreeWay;
    const defaultRenamer: Renamer = (s) => s;
</script>

<script lang="ts">
    import Base from "../Base.svelte";
    import Container from "./Container.svelte";
    import Content from "./Content.svelte";
    import Controls from "../block/controls/Controls.svelte";
    import Scrollable from "./Scrollable.svelte";
    import VerticalPanel from "./VerticalPanel.svelte";

    import Nav from "../navigation/Nav.svelte";
    import ThemeToggle from "./ThemeToggle.svelte";

    import {
        initControlInfo,
        initControlValue,
        type Controls as ControlInfo
    } from "../block/context";
    import { getTheme, initTheme, type Theme } from "../context";

    import { get, type Writable } from "svelte/store";

    export let data: readonly string[];
    export let current: string | null = null;

    export let sorter: Sorter | null = null;
    export let renamer: Renamer | null = null;
    export let theme: Theme | undefined = undefined;
    export let offset = 250;
    export let panel: "bottom" | "right" = "bottom";

    let mode: "props" | "events" = "props";
    let panelOffset = 4;

    initControlValue();
    const activeControl = initControlInfo();
    const parentTheme = getTheme();
    const dark = initTheme();

    $: $dark = theme === undefined ? $parentTheme : "dark" === theme;

    const panelChange = (info: Writable<ControlInfo> | null) => {
        if (info != null) {
            const i = get(info);
            if (4 === panelOffset) {
                if (i.props.length > 0) {
                    panelOffset = 250;
                    mode = "props";
                } else if (i.events.length > 0) {
                    panelOffset = 250;
                    mode = "events";
                }
            }
            return;
        }
        panelOffset = 4;
    };
    $: panelChange($activeControl);
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/1-Layout) for more details.
-->

<Base dark={$dark} fill>
    <div class="fill layout">
        <div class="top">
            <div class="title">
                <slot name="title" />
            </div>
            <slot name="title-misc">
                <ThemeToggle bind:theme />
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
                <Container vertical={"right" === panel} persistent bind:offset={panelOffset}>
                    <svelte:fragment slot="A">
                        <Scrollable>
                            <Content>
                                {#key current}
                                    <slot />
                                {/key}
                            </Content>
                        </Scrollable>
                    </svelte:fragment>
                    <svelte:fragment slot="B">
                        <Controls bind:position={panel} bind:mode />
                    </svelte:fragment>
                </Container>
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
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        user-select: none;
    }

    .title {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        justify-content: left;
        gap: 0.25rem;
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

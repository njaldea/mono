<script lang="ts" module>
    import type { Sorter, Renamer } from "../navigation/types";

    type ThreeWay = -1 | 0 | 1;
    const defaultSorter: Sorter = (l, r) => l.localeCompare(r) as ThreeWay;
    const defaultRenamer: Renamer = (s) => s;
</script>

<script lang="ts">
    import Base from "../Base.svelte";
    import Body from "./Body.svelte";
    import Header from "./Header.svelte";

    import {
        initControlInfo,
        initControlValue,
        type Controls as ControlInfo
    } from "../block/context";
    import { getTheme, initTheme, type Theme } from "../context";

    import { get, type Writable } from "svelte/store";
    import { onDestroy, type Snippet } from "svelte";

    let {
        data,
        current = null,
        sorter = null,
        renamer = null,
        theme = $bindable(),
        offset = $bindable(250),
        panel = $bindable(),
        title,
        title_misc,
        children,
        onnavigate
    }: {
        data: readonly string[];
        current?: string | null;
        sorter?: Sorter | null;
        renamer?: Renamer | null;
        theme?: Theme;
        offset?: number;
        panel?: "bottom" | "right";
        title: Snippet;
        title_misc?: Snippet;
        children?: Snippet;
        onnavigate?: (e: { detail: string }) => void;
    } = $props();

    let mode: "props" | "events" = $state("props");
    let panelOffset = $state(4);

    initControlValue();
    const activeControl = initControlInfo();
    const parentTheme = getTheme();
    const dark = initTheme();

    $effect(() => dark.set(theme === undefined ? $parentTheme : "dark" === theme));

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

    onDestroy(activeControl.subscribe((v) => panelChange(v)));
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/1-Layout) for more details.
-->

<Base dark={$dark} fill>
    <div class="fill layout">
        <Header {title} {title_misc} bind:theme />
        <Body
            data={data}
            current={current}
            sorter={sorter ?? defaultSorter}
            renamer={renamer ?? defaultRenamer}
            {onnavigate}
            bind:offset
            bind:panelOffset
            bind:panel
            bind:mode
        >
            {@render children?.()}
        </Body>
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
        color-scheme: var(--i-nil-doc-color-scheme);
        color: var(--i-nil-doc-color);
        background-color: var(--i-nil-doc-bg-color);
        transition:
            color var(--i-nil-doc-transition-time),
            background-color var(--i-nil-doc-transition-time);
    }

</style>

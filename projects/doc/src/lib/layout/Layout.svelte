<script lang="ts">
    import type { Sorter, Renamer, Parser } from "../navigation/types";
    import BareLayout from "./BareLayout.svelte";
    import Body from "./Body.svelte";
    import Header from "./Header.svelte";
    import ThemeToggle from "./ThemeToggle.svelte";

    import {
        initControlInfo,
        initControlValue,
    } from "../block/context";
    import { getTheme, initTheme, type Theme } from "../context";

    import { get, fromStore } from "svelte/store";
    import { untrack, type Snippet } from "svelte";

    let {
        data,
        current = null,
        parser = (s) => s.slice(1).split('/'),
        sorter = (l, r) => l.localeCompare(r) as -1 | 0 | 1,
        renamer = (s) => s,
        theme = $bindable(),
        offset = $bindable(250),
        panel = $bindable(),
        title,
        title_misc: tmisc,
        children,
        onnavigate
    }: {
        data: readonly string[];
        current?: string | null;
        parser?: Parser;
        sorter?: Sorter;
        renamer?: Renamer;
        theme?: Theme;
        offset?: number;
        panel?: "bottom" | "right";
        title: Snippet;
        title_misc?: Snippet;
        children?: Snippet;
        onnavigate?: (e: { detail?: string }) => void;
    } = $props();

    let mode: "props" | "events" = $state("props");
    let panel_offset = $state(4);

    initControlValue();
    const active_control = fromStore(initControlInfo());
    const parent_theme = fromStore(getTheme());
    const dark = fromStore(initTheme());

    $effect(() => {
        theme;
        parent_theme.current;
        untrack(() => {
            if (theme === undefined) {
                dark.current = parent_theme.current;
            } else {
                dark.current = "dark" === theme;
            }
        });
    });

    $effect(() => {
        active_control.current;
        untrack(() => {
            if (active_control.current != null) {
                const i = get(active_control.current);
                if (4 === panel_offset) {
                    if (i.props.length > 0) {
                        panel_offset = 250;
                        mode = "props";
                    } else if (i.events.length > 0) {
                        panel_offset = 250;
                        mode = "events";
                    }
                }
            } else {
                panel_offset = 4;
            }
        });
    });
</script>

<BareLayout dark={dark.current}>
    {#snippet header()}
        <Header {title}>
            {#snippet title_misc()}
                {#if tmisc != null}
                    {@render tmisc()}
                {:else}
                    <ThemeToggle bind:theme />
                {/if}
            {/snippet}
        </Header>
    {/snippet}
    {#snippet body()}
        <Body
            {data}
            {current}
            {parser}
            {sorter}
            {renamer}
            {onnavigate}
            bind:offset
            bind:panel_offset
            bind:panel
            bind:mode
        >
            {@render children?.()}
        </Body>
    {/snippet}
</BareLayout>

<script lang="ts" module>
    import type { Readable, Writable } from "svelte/store";

    type Settings = {
        readonly data: readonly string[];
        readonly current: Readable<string | null>;
        readonly offset: Writable<number>;
        readonly theme: Writable<"dark" | "light">;
        readonly panel: Writable<"bottom" | "right">;
        readonly navigate: (e: { detail: string }) => Promise<void>;
    };
</script>

<script lang="ts">
    import Layout from "$lib/components/layout/Layout.svelte";
    import type { Renamer, Sorter } from "../navigation/types";
    import type { Snippet } from "svelte";

    let {
        settings,
        sorter,
        renamer,
        title,
        title_misc,
        children
    }: {
        settings: Settings;
        sorter?: Sorter;
        renamer?: Renamer;
        title: Snippet;
        title_misc?: Snippet;
        children?: Snippet;
    } = $props();

    let { data, current, theme, offset, panel, navigate } = $derived(settings);
</script>

<Layout
    {data}
    {sorter}
    {renamer}
    current={$current}
    bind:theme={$theme}
    bind:offset={$offset}
    bind:panel={$panel}
    onnavigate={navigate}
    {title}
    {title_misc}
    {children}
></Layout>

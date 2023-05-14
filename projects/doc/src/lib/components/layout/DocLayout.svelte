<script lang="ts" context="module">
    import type { Readable, Writable } from "svelte/store";

    type Settings = {
        data: string[];
        current: Readable<string | null>;
        offset: Writable<number>;
        theme: Writable<"dark" | "light">;
        panel: Writable<"bottom" | "right">;
        navigate: (e: { detail: string }) => Promise<void>;
    };
</script>

<script lang="ts">
    import Layout from "$lib/components/layout/Layout.svelte";
    import ThemeToggle from "./ThemeToggle.svelte";
    import type { Renamer, Sorter } from "../navigation/types";

    export let settings: Settings;
    export let sorter: Sorter | undefined = undefined;
    export let renamer: Renamer | undefined = undefined;

    let { data, current, theme, offset, panel, navigate } = settings;
    $: {
        data = settings.data;
        current = settings.current;
        theme = settings.theme;
        offset = settings.offset;
        panel = settings.panel;
        navigate = settings.navigate;
    }
</script>

<Layout
    {data}
    {sorter}
    {renamer}
    current={$current}
    bind:theme={$theme}
    bind:offset={$offset}
    bind:panel={$panel}
    on:navigate={navigate}
>
    <slot slot="title" name="title" />
    <slot slot="title-misc" name="title-misc">
        <ThemeToggle bind:theme={$theme} />
    </slot>
    <slot />
</Layout>

<script lang="ts">
    import Split from "./Split.svelte";
    import Controls from "../block/controls/Controls.svelte";
    import Scrollable from "./Scrollable.svelte";
    import Nav from "../navigation/Nav.svelte";
    import type { Sorter, Renamer, Parser } from "../navigation/types";
    import type { Snippet } from "svelte";

    let {
        data,
        current,
        parser = (s) => s.slice(1).split('/'),
        sorter = (l, r) => l.localeCompare(r) as -1 | 0 | 1,
        renamer = (s) => s,
        onnavigate,
        offset = $bindable(250),
        panel_offset = $bindable(4),
        panel = $bindable(),
        mode = $bindable("props"),
        children
    }: {
        data: readonly string[];
        current: string | null;
        parser?: Parser;
        sorter?: Sorter;
        renamer?: Renamer;
        onnavigate?: (e: { detail?: string }) => void;
        offset?: number;
        panel_offset?: number;
        panel?: "bottom" | "right";
        mode?: "props" | "events";
        children?: Snippet;
    } = $props();
</script>

<Split bind:offset vertical b persistent>
    {#snippet side_a()}
        <Scrollable>
            <Nav info={data} selected={current ?? ""} {parser} {sorter} {renamer} {onnavigate} />
        </Scrollable>
    {/snippet}
    {#snippet side_b()}
        {#if panel == null}
            <Scrollable>
                {#key current}
                    {@render children?.()}
                {/key}
            </Scrollable>
        {:else}
            <Split vertical={"right" === panel} persistent bind:offset={panel_offset}>
                {#snippet side_a()}
                    <Scrollable>
                        {#key current}
                            {@render children?.()}
                        {/key}
                    </Scrollable>
                {/snippet}
                {#snippet side_b()}
                    <Scrollable>
                        <Controls bind:position={panel} bind:mode />
                    </Scrollable>
                {/snippet}
            </Split>
        {/if}
    {/snippet}
</Split>

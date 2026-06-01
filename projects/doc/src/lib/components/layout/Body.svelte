<script lang="ts">
    import Split from "./Split.svelte";
    import Content from "./Content.svelte";
    import Controls from "../block/controls/Controls.svelte";
    import Scrollable from "./Scrollable.svelte";
    import Nav from "../navigation/Nav.svelte";
    import type { Sorter, Renamer } from "../navigation/types";
    import type { Snippet } from "svelte";

    let {
        data,
        current,
        sorter,
        renamer,
        onnavigate,
        offset = $bindable(250),
        panelOffset = $bindable(4),
        panel = $bindable(),
        mode = $bindable("props"),
        children
    }: {
        data: readonly string[];
        current: string | null;
        sorter: Sorter;
        renamer: Renamer;
        onnavigate?: (e: { detail?: string }) => void;
        offset?: number;
        panelOffset?: number;
        panel?: "bottom" | "right";
        mode?: "props" | "events";
        children?: Snippet;
    } = $props();
</script>

<Split bind:offset vertical b persistent>
    {#snippet side_a()}
        <Scrollable>
            <Nav
                info={data}
                selected={current ?? ""}
                {sorter}
                {renamer}
                {onnavigate}
            />
        </Scrollable>
    {/snippet}
    {#snippet side_b()}
        {#if panel == null}
            <Scrollable>
                <Content>
                    {#key current}
                        {@render children?.()}
                    {/key}
                </Content>
            </Scrollable>
        {:else}
            <Split vertical={"right" === panel} persistent bind:offset={panelOffset}>
                {#snippet side_a()}
                    <Scrollable>
                        <Content>
                            {#key current}
                                {@render children?.()}
                            {/key}
                        </Content>
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

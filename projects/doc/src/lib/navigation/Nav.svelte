<script lang="ts" module>
    import type { Tree as Detail, Sorter, Renamer, Parser } from "./types";

    import { fuzz } from "./utils/fuzz";
    import { sort } from "./utils/sort";

    const populate = (
        info: readonly string[],
        parser: Parser
    ): Record<string, Detail> => {
        const retval: Record<string, Detail> = {};
        for (const path of info) {
            const parts = parser(path);
            if (parts.length == 0) {
                continue;
            }

            let t = retval;
            for (let i = 0; i < parts.length; ++i) {
                const part = parts[i];
                if (!(part in t)) {
                    t[part] = { url: null, expanded: true, hidden: false, sub: {} };
                }

                if (i !== parts.length - 1) {
                    t[part] = t[part];
                }

                if (i !== parts.length - 1) {
                    t = t[part].sub;
                } else {
                    t[part].url = path;
                }
            }
        }
        return retval;
    };

    const apply_filter = (
        tree: Record<string, Detail>,
        filter: string
    ): boolean => {
        let matched = false;
        for (const key in tree) {
            const node = tree[key];
            const match_child = apply_filter(node.sub, filter);
            const match_url = node.url !== null && fuzz(node.url, filter);
            const match = match_child || match_url;
            node.hidden = !match && filter.length > 0;
            node.expanded = node.expanded || match;
            matched = matched || match;
        }
        return matched;
    };
</script>

<script lang="ts">
    import Node from "./Node.svelte";
    import { untrack } from "svelte";

    let {
        info,
        selected,
        parser,
        sorter,
        renamer,
        onnavigate
    }: {
        info: readonly string[];
        selected: string;
        parser: Parser;
        sorter: Sorter;
        renamer: Renamer;
        onnavigate?: (e: { detail?: string }) => void;
    } = $props();

    let filter = $state("");

    let tree = $state({}) as Record<string, Detail>;

    $effect(() => {
        info;
        parser;
        untrack(() => {
            tree = populate(info, parser);
        });
    });

    $effect(() => {
        filter;
        untrack(() => {
            apply_filter(tree, filter);
        });
    });
</script>

<div class="nav">
    <div class="search-bar">
        <input bind:value={filter} type="text" placeholder="Search for page..." />
    </div>
    <div class="tree">
        {#each sort(tree, sorter) as [key] (key)}
            <Node
                {key}
                bind:value={tree[key]}
                depth={0}
                {selected}
                {sorter}
                {renamer}
                {onnavigate}
            />
        {/each}
    </div>
</div>

<style>
    .nav {
        width: 100%;
        height: 100%;
        min-width: 12.5rem;
        display: flex;
        flex-direction: column;
    }

    .search-bar {
        padding: 0.25rem;
    }

    input {
        font-size: 0.75rem;
        height: 1.75rem;
        width: 100%;
        padding: 0px 0.5rem;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
    }
</style>

<script lang="ts" context="module">
    import type { Tree as Detail, States, Sorter, Renamer } from "./types";

    function apply<T>(
        paths: string[],
        init: () => T,
        pre: (t: T, path: string) => T,
        next: (t: T) => Record<string, T>,
        post?: (t: T, p: string) => void
    ) {
        const retval: Record<string, T> = {};
        for (const path of paths) {
            const parts = path.split("/");
            if (parts.length <= 1) {
                continue;
            }

            let t = retval;
            for (let i = 1; i < parts.length; ++i) {
                const part = parts[i];
                if (t[part] == null) {
                    t[part] = init();
                }

                if (i !== parts.length - 1) {
                    t[part] = pre(t[part], path);
                }

                if (i !== parts.length - 1) {
                    t = next(t[part]);
                } else if (post) {
                    post(t[part], path);
                }
            }
        }
        return retval;
    }

    function filt(path: string, filter: string, renamer: Renamer) {
        return path.includes(filter) || path.split("/").map(renamer).join("/").includes(filter);
    }

    function populate(filter: string, info: string[], renamer: Renamer): Record<string, Detail> {
        return apply<Detail>(
            filter.length > 0 ? info.filter((path) => filt(path, filter, renamer)) : info,
            () => ({ url: null, sub: {} }),
            (t) => t,
            (t) => t.sub,
            (t, p) => {
                t.url = p;
            }
        );
    }
</script>

<script lang="ts">
    import Tree from "./Tree.svelte";

    export let info: string[];
    export let selected: string;
    export let sorter: Sorter;
    export let renamer: Renamer;

    let filter = "";
    let states = apply<States>(
        info,
        () => ({ expanded: false, sub: {} }),
        (t, path) => ({ expanded: t.expanded || selected === path, sub: t.sub }),
        (t) => t.sub
    );

    function update(selected: string) {
        if (!info.includes(selected)) {
            return;
        }

        let node = states;
        const paths = selected.split("/").slice(1);
        for (const [i, p] of paths.entries()) {
            if (i < paths.length - 1) {
                node[p].expanded = true;
            }
            node = node[p].sub;
        }
    }

    $: update(selected);
</script>

<div class="nav">
    <div class="logo"><slot /></div>
    <div class="search-bar">
        <input bind:value={filter} type="text" />
    </div>
    <div class="tree">
        <Tree
            tree={populate(filter, info, renamer)}
            {selected}
            {sorter}
            {renamer}
            bind:states
            on:navigate
            force_expand={filter.length > 0}
        />
    </div>
</div>

<style>
    .nav {
        width: 100%;
        height: 100%;
        gap: 10px;
        padding-top: 20px;
        display: flex;
        flex-direction: column;
    }

    .logo,
    .search-bar {
        padding-left: 20px;
        padding-right: 20px;
    }

    input {
        height: 20px;
        width: 100%;
    }
</style>

<script lang="ts" context="module">
    function apply<T>(
        paths: string[],
        init: () => T,
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
                    t = next(t[part]);
                } else if (post) {
                    post(t[part], path);
                }
            }
        }
        return retval;
    }
</script>

<script lang="ts">
    import Tree from "$lib/layout/navigation/Tree.svelte";
    import type { Tree as Detail, States } from "./types";

    export let info: string[];
    export let selected: string;

    let filter = "";
    let states = apply<States>(
        info,
        () => ({ expanded: false, sub: {} }),
        (t) => t.sub
    );

    function populate(f: string, i: string[]): Record<string, Detail> {
        return apply<Detail>(
            f.length > 0 ? i.filter((d) => d.includes(f)) : i,
            () => ({ url: null, sub: {} }),
            (t) => t.sub,
            (t, p) => {
                t.url = p;
            }
        );
    }
</script>

<div class="root">
    <div class="logo">Logo</div>
    <div class="search-bar">
        <input bind:value={filter} type="text" />
    </div>
    <div class="tree">
        <Tree
            tree={populate(filter, info)}
            {selected}
            bind:states
            force_expand={filter.length > 0}
        />
    </div>
</div>

<style>
    .root {
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

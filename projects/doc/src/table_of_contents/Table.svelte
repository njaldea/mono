<script lang="ts">
    import Tree from './Tree.svelte';
    import type { Tree as Detail } from './type';

    export let info: string[];
    export let selected: string;

    let filter = '';

    function iterate(paths: string[]) {
        const retval: Detail = {};

        for (const path of paths) {
            const parts = path.split('/');
            parts.shift();
            if (parts.length === 0) {
                continue;
            }
            let p = retval;
            for (const part of parts) {
                if (!p[part]) {
                    p[part] = {};
                }
                p = p[part] as Tree;
            }
            p['__link'] = path;
        }
        return retval;
    }

    function populate(f: string, i: string[]): Detail {
        return iterate(i.filter((d) => d.includes(f)));
    }
</script>

<div class="root">
    <div class="logo">Logo</div>
    <div class="search-bar">
        <input bind:value={filter} type="text" />
    </div>
    <div class="tree">
        <Tree tree={populate(filter, info)} {selected} />
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
        color: var(--text-color);
    }

    input {
        height: 20px;
        width: 100%;
    }
</style>

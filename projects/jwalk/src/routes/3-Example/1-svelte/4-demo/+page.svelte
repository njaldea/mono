<script lang="ts">
    import { editor } from "../2-actions/editor";
    import { viewer } from "../2-actions/viewer";

    import jsonpointer from "jsonpointer";

    import type { Context } from "../2-actions/types";
    import { onMount } from "svelte";

    let mounted = false;
    let json: {
        subgroup: { 123: [number, number] };
        point: [number, number];
        point35: [number, number];
    } = {
        subgroup: { 123: [3, 2] },
        point: [1, 2],
        point35: [3, 5]
    };

    const context: Context = {
        notify: (path, value) => {
            if (mounted) {
                console.log("change", path, value);
                jsonpointer.set(json, path, value);
                json = json;
            }
        }
    };
    const eaction = (target: HTMLDivElement, value: typeof json) => {
        return editor().build({ target, context }, value);
    };
    const vaction = (target: HTMLDivElement, value: typeof json) => {
        return viewer().build({ target, context }, value);
    };
    onMount(() => (mounted = true));
</script>

<h2>demo</h2>

<div class="top">
    Editor
    <div use:eaction={json} />
    <br />
    Viewer
    <div use:vaction={json} />
</div>

<style>
    .top {
        width: 500px;
        /* outline: red solid 1px; */
    }
</style>

<script lang="ts">
    import { editor } from "../2-actions/editor";
    import { viewer } from "../2-actions/viewer";

    import jsonpointer from "jsonpointer";

    import type { Context } from "../2-actions/types";

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
            console.log("change", path, value);
            jsonpointer.set(json, path, value);
            json = json;
        }
    };

    const content = [
        { type: "Group", key: "subgroup", value: [{ type: "Point", key: "123" }] },
        { type: "Point", key: "point" },
        { type: "Point", key: "point35" }
    ] as const;

    const eaction = (target: HTMLDivElement, value: typeof json) => {
        return editor().node("ROOT", "Group", { value: content }).build({ target, context }, value);
    };
    const vaction = (target: HTMLDivElement, value: typeof json) => {
        return viewer().node("ROOT", "Group", { value: content }).build({ target, context }, value);
    };
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

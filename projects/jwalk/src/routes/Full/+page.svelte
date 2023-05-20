<script lang="ts">
    import { editor } from "./actions/editor";
    import { viewer } from "./actions/viewer";

    import jsonpointer from "jsonpointer";

    let json: { pose: [number, number, number] } = {
        pose: [1, 2, 3]
    };

    const context = {
        notify: (path: string, value: number) => {
            console.log("change", path, value);
            jsonpointer.set(json, path, value);
            json = json;
        }
    };
    const schema = [
        "Group",
        [
            // { type: "Group", value: [{ type: "Pose", key: "123" }]},
            { type: "Pose", key: "pose" }
            // { type: "Pose", key: "pose352" },
        ]
    ] as const;
    const eaction = (target: HTMLDivElement, value: { pose: [number, number, number] }) => {
        return editor()
            .add("ROOT", ...schema)
            .build({ target, context }, value);
    };
    const vaction = (target: HTMLDivElement, value: { pose: [number, number, number] }) => {
        return viewer()
            .add("ROOT", ...schema)
            .build({ target, context }, value);
    };
</script>

<div class="top">
    <div use:eaction={json} />
    <div use:vaction={json} />
</div>

<style>
    .top {
        width: 500px;
        /* outline: red solid 1px; */
    }
</style>

<script lang="ts">
    import Canvas from "../src/Canvas.svelte";
    import { Block, Template, Params, Controls } from "@nil-/doc";
    import type { Prop } from "@nil-/doc";

    const defaults = {
        target: "",
        intensity: 0.3,
        direction: [0, 1, 0] as [number, number, number],
        position: [0, 0.5, 0] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        scaling: [5, 5, 5] as [number, number, number],
        color: [1, 0, 0] as [number, number, number],
        toggle: false,
        materialID: "standard",
        instances: 1
    };

    const makeControl = (name: string, min: number, max: number, step: number) =>
        ({
            name,
            type: "tuple",
            values: [
                { type: "range", min, max, step },
                { type: "range", min, max, step },
                { type: "range", min, max, step }
            ]
        }) satisfies Prop;
</script>

<Block>
    <Template let:props {defaults} noreset>
        <div>
            <Canvas id="main" {...props} />
        </div>
    </Template>
    <Params tag={"0"} props={defaults} />
    <Controls
        props={[
            {
                name: "instances",
                type: "range",
                min: 1,
                max: 10,
                step: 1
            },
            {
                name: "target",
                type: "select",
                values: ["", "box1", "box2", "box3", "box4", "group1", "rotating"]
            },
            {
                name: "toggle",
                type: "toggle"
            },
            {
                name: "materialID",
                type: "select",
                values: ["standard", "grid"]
            },
            {
                name: "intensity",
                type: "range",
                min: 0,
                max: 1,
                step: 0.01
            },
            makeControl("direction", -10, 10, 0.01),
            makeControl("position", -10, 10, 0.01),
            makeControl("rotation", -10, 10, 0.01),
            makeControl("color", 0, 1, 0.01),
            makeControl("scaling", 0.001, 10, 0.01)
        ]}
    />
</Block>

<style>
    div {
        height: 100%;
        max-height: 800px;
    }
</style>

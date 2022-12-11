<script lang="ts">
    import Canvas from "./Canvas.svelte";

    const defaults = {
        target: "",
        intensity: 0.3,
        direction_x: 0,
        direction_y: 1,
        direction_z: 0,
        position: [0, 0.5, 0] as [number, number , number],
        rotation_x: 0,
        rotation_y: 0,
        rotation_z: 0,
        scaling_x: 5,
        scaling_y: 5,
        scaling_z: 5,
        color_x: 1,
        color_y: 0,
        color_z: 0,
        toggle: false,
        materialID: "standard"
    }

    import { Block, Template, Params, Controls } from "@nil-/doc";
</script>

<Block>
    <Template
        let:props
        {defaults}
        noreset
    >
        <div class="canvas">
            <Canvas
                id="main"
                target={props.target}
                intensity={props.intensity}
                direction={[ props.direction_x, props.direction_y, props.direction_z ]}
                position={props.position}
                rotation={[ props.rotation_x, props.rotation_y, props.rotation_z ]}
                scaling={[ props.scaling_x, props.scaling_y, props.scaling_z ]}
                color={[ props.color_x, props.color_y, props.color_z ]}
                toggle={props.toggle}
                materialID={props.materialID}
            />
        </div>
    </Template>
    <Params tag={"0"} props={defaults}/>
    <Controls
        props={[
            {
                name: "target",
                type: "select",
                values: ["", "box1", "box2", "box3", "box4", "group1"]
            },
            {
                name: "toggle",
                type: "switch",
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
            {
                name: "direction_x",
                type: "range",
                min: -10,
                max: 10,
                step: 0.01
            },
            {
                name: "direction_y",
                type: "range",
                min: -10,
                max: 10,
                step: 0.01
            },
            {
                name: "direction_z",
                type: "range",
                min: -10,
                max: 10,
                step: 0.01
            },
            {
                name: "position",
                type: "tuple",
                values: [
                    {
                        type: "range",
                        min: -10,
                        max: 10,
                        step: 0.01
                    },
                    {
                        type: "range",
                        min: -10,
                        max: 10,
                        step: 0.01
                    },
                    {
                        type: "range",
                        min: -10,
                        max: 10,
                        step: 0.01
                    }
                ]
            },
            {
                name: "rotation_x",
                type: "range",
                min: -10,
                max: 10,
                step: 0.01
            },
            {
                name: "rotation_y",
                type: "range",
                min: -10,
                max: 10,
                step: 0.01
            },
            {
                name: "rotation_z",
                type: "range",
                min: -10,
                max: 10,
                step: 0.01
            },
            {
                name: "color_x",
                type: "range",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                name: "color_y",
                type: "range",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                name: "color_z",
                type: "range",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                name: "scaling_x",
                type: "range",
                min: 0.001,
                max: 10,
                step: 0.01
            },
            {
                name: "scaling_y",
                type: "range",
                min: 0.001,
                max: 10,
                step: 0.01
            },
            {
                name: "scaling_z",
                type: "range",
                min: 0.001,
                max: 10,
                step: 0.01
            },
        ]}
        expand
    />
</Block>

<style>
    div {
        height: 500px;
    }
</style>
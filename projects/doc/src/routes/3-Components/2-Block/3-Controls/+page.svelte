<script lang="ts">
    import { Block, Instance, Controls } from "$lib";
    import Component from "../Component.svelte";
</script>

# Controls component

Since we are in the realm of svelte, being able to modify the template/instance easily would be very helpful.

Controls component allows us to override the params forwarded by the template through the slot props.

Supported control types are:
- [Text](/3-Components/2-Block/3-Controls/1-Text)
- [Number](/3-Components/2-Block/3-Controls/2-Number)
- [Range](/3-Components/2-Block/3-Controls/3-Range)
- [Switch](/3-Components/2-Block/3-Controls/4-Switch)
- [Select](/3-Components/2-Block/3-Controls/5-Select)
- [Tuple](/3-Components/2-Block/3-Controls/6-Tuple)
- [Object](/3-Components/2-Block/3-Controls/7-Object)

---

<div>

```svelte
<Block>
    <Instance
        defaults={{
            v_text: "text",
            v_number: 1,
            v_range: 3,
            v_select: "select",
            v_switch: true
        }}
        let:props
    >
        <Component {...props} tag={"tag"}/>
    </Instance>
    <Controls
        expand
        props={[
            {
                name: "v_text",
                type: "text"
            },
            {
                name: "v_number",
                type: "number"
            },
            {
                name: "v_range",
                type: "range",
                min: 0,
                max: 10,
                step: 1
            },
            {
                name: "v_select",
                type: "select",
                values: ["A", "B", "C"]
            },
            {
                name: "v_switch",
                type: "switch"
            }
        ]}
    />
</Block>
```

    <Block>
        <Instance
            defaults={{
                v_text: "text",
                v_number: 1,
                v_range: 0,
                v_select: "select",
                v_switch: true,
                v_array: [1, "string", false]
            }}
            let:props
        >
            <Component {...props} tag={"tag"}/>
        </Instance>
        <Controls
            expand
            props={[
                {
                    name: "v_text",
                    type: "text"
                },
                {
                    name: "v_number",
                    type: "number"
                },
                {
                    name: "v_range",
                    type: "range",
                    min: 0,
                    max: 10,
                    step: 1
                },
                {
                    name: "v_select",
                    type: "select",
                    values: ["A", "B", "C"]
                },
                {
                    name: "v_switch",
                    type: "switch"
                },
                {
                    name: "v_array",
                    type: "array",
                    values: [
                        {
                            name: "v_number",
                            type: "number"
                        },
                        {
                            name: "v_text",
                            type: "text"
                        },
                        {
                            name: "v_switch",
                            type: "switch"
                        }
                    ]
                }
            ]}
        />
    </Block>
</div>

<style>
    div {
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        min-width: 1000px;
        max-width: 1500px;
    }
</style>

---

## Hide/Show

By default, the control panel is hidden.

To hide/show the component:
- Hovering on the Block will show the Controls Component.
- Clicking on the Block will hold the Controls Component.
- Clicking outside of the Block will hide the Controls Component.

Enable `expand` prop to always show the Control panel.

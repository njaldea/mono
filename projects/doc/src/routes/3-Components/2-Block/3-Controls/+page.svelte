<script lang="ts">
    import { Block, Template, Params, Controls } from "$lib";
    import Component from "../Component.svelte";
</script>

# Controls component

Since we are in the realm of svelte, being able to modify the template easily would be very helpful.

Controls component allows us to override the params forwarded by the template through the slot props.

To hide/show the component:
- Hovering on the Block will show the Controls Component.
- Clicking on the Block will hold the Controls Component.
- Clicking outside of the Block will hide the Controls Component.

---

```svelte
<Block>
    <Template
        defaults={{ v_text: "text", v_number: 1, v_range: 3, v_select: "select", v_switch: true }}
        let:props
        let:tag
    >
        <Component {...props} {tag}/>
    </Template>

    <Params tag="first"/>
    <Controls props={[
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
    ]}/>
</Block>
```

> Result

<Block>
    <Template
        defaults={{ v_text: "text", v_number: 1, v_range: 3, v_select: "select", v_switch: true }}
        let:props
        let:tag
    >
        <Component {...props} {tag}/>
    </Template>

    <Params tag="first"/>
    <Controls props={[
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
    ]}/>
</Block>

---

Controls component expects a list of control information to populate its content. Details are as follows:

### Text
```json
{
    name: <string>,
    type: "text"
}
```

### Number
```json
{
    name: <string>,
    type: "number"
}
```

### Range
```json
{
    name: <string>,
    type: "range",
    min: <number>
    max: <number>
    step: <number>
}
```

### Select
```json
{
    name: <string>,
    type: "select",
    values: <string[]>
}
```

### Switch
```json
{
    name: <string>,
    type: "switch"
}
```

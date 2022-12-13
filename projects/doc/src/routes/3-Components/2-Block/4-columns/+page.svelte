<script lang="ts">
    import { Block, Template, Params, Controls } from "$lib";
    import Component from "../Component.svelte";
    
    const defaults = {
        v_text: "text",
        v_number: 1,
        v_range: 0,
        v_select: "select",
        v_switch: true,
        v_array: [1, "string", false] as [number, string, boolean],
        v_defaulted: "initial_value"
    };
</script>

# column

By default, a Template component will layout the content (instances) vertically in one column.

To override this behavior, enable `columns` for the template.

This is most useful when comparing different instances side by side.

```svelte
<Block>
    <Template
        defaults={{
            v_text: "text",
            v_number: 1,
            v_range: 0,
            v_select: "select",
            v_switch: true,
            v_array: [1, "string", false],
            v_defaulted: "initial_value"
        }}
        let:props
        let:tag
        columns
    >
        <Component {...props} {tag} />
    </Template>
    <Params />
    <Params />
    <Controls
        props={[{
            name: "v_defaulted",
            type: "text"
        }]}
    />
</Block>
```

> Result

<Block>
    <Template
        {defaults}
        let:props
        let:tag
        columns
    >
        <Component {...props} {tag} />
    </Template>

    <Params />
    <Params />
    <Controls
        props={[{
            name: "v_defaulted",
            type: "text"
        }]}
    />
</Block>
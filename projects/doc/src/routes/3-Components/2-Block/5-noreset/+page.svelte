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

# noreset

By default, any change in the properties will result in re-rendering the whole component. For more details, see [issue](https://github.com/sveltejs/svelte/issues/4442).

To override this, enable `noreset` for the template.

This is most useful for components that contains states.

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
        noreset
    >
        <Component {...props} {tag} />
    </Template>
    <Params />
    <Controls
        props={[{
            name: "v_defaulted",
            type: "text"
        }]}
        expand
    />
</Block>
```

> Result

<Block>
    <Template
        {defaults}
        let:props
        let:tag
        noreset
    >
        <Component {...props} {tag} />
    </Template>

    <Params />
    <Controls
        props={[{
            name: "v_defaulted",
            type: "text"
        }]}
        expand
    />
</Block>
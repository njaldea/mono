<script lang="ts">
    import { Block, Template, Params, Controls } from "$lib";
    import Component from "../Component.svelte";
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
            v_defaulted: "initial_value"
        }}
        let:props
        let:tag
        noreset
    >
        <Component {...props} {tag}/>
    </Template>

    <Params tag="first"/>
    <Controls props={[
        {
            name: "v_defaulted",
            type: "text"
        }
    ]}/>
</Block>
```

> Result

<Block>
    <Template
        defaults={{
            v_text: "text",
            v_number: 1,
            v_range: 0,
            v_select: "select",
            v_switch: true,
            v_defaulted: "initial_value"
        }}
        let:props
        let:tag
        noreset
    >
        <Component {...props} {tag}/>
    </Template>

    <Params tag="first" />
    <Controls props={[
        {
            name: "v_defaulted",
            type: "text"
        }
    ]}/>
</Block>
<script lang="ts">
    import { Block, Instance, Controls } from "$lib";
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

# let:key

Using [noreset](/3-Components/2-Block/4-noreset) prevents the whole slot of Instance/Template component not to be re-created.

If in case some of the components in the slot needs to be re-rendered, `key` slot is provided. It is a flag (boolean) that is flipped during svelte's `beforeRender`.

```svelte
<Block>
    <Instance
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
        let:key
        noreset
    >
        {#key key}
            <Component {...props} {tag} />
        {/key}
    </Instance>
    <Controls
        expand
        props={[{
            name: "v_defaulted",
            type: "text"
        }]}
    />
</Block>
```

> Result

<Block>
    <Instance
        {defaults}
        let:props
        let:key
        noreset
    >
        {#key key}
            <Component {...props} tag={"tag"} />
        {/key}
    </Instance>
    <Controls
        expand
        props={[{
            name: "v_defaulted",
            type: "text"
        }]}
    />
</Block>
<script lang="ts">
    import { Block, Template, Params } from "$lib";
    import Component from "../Component.svelte";

    const defaults = {
        v_text: "text",
        v_number: 1,
        v_range: 3,
        v_select: "select",
        v_switch: true,
        v_array: [1, "string", false] as [number, string, boolean]
    };
</script>

# Template component

Template component populates the same "content" for every Param component inside the Block
-  available properties
   - `defaults`
       - values are used to populate the prop forwarded to slot
       - use `undefined` to indicate optional property
   - [`noreset`](/3-Components/2-Block/5-noreset)
   - [`columns`](/3-Components/2-Block/4-columns)
 -  available slot properties
    - [`let:props`](/3-Components/2-Block/7-let:props)
       - properties derived from `defaults` and props from `Params`
       - any unknown properties from params are disregarded.
       - only keys from defaults are honored.
    - [`let:key`](/3-Components/2-Block/6-let:key)
      - Flag that is flipped during svelte's `beforeRender`
      - Can be used together with `noreset` to granularly control which part of the template needs to be re-rendererd.
    - `let:tag`
      - Param identifier

Works hand in hand with [Params](/3-Components/2-Block/2-Template/1-Params) component

```svelte
<Block>
    <Template
        defaults={{
            v_text: "text",
            v_number: 1,
            v_range: 0,
            v_select: "select",
            v_switch: true,
            v_array: [1, "string", false]
        }}
        let:props
        let:tag
        let:id
    >
        <Component {...props} tag={`${id}-${tag}`}/>
    </Template>
    <Params tag="first"/>
</Block>
```

> Result

<Block>
    <Template
        {defaults}
        let:props
        let:tag
        let:id
    >
        <Component {...props} tag={`${id}-${tag}`}/>
    </Template>
    <Params tag="first"/>
</Block>

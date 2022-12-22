<script lang="ts">
    import { Block, Instance } from "$lib";
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

# Instance component

Instance component populates the "content".
-  available properties
   - `defaults`
       - values are used to populate the prop forwarded to slot
       - use `undefined` to indicate optional property
   - [`noreset`](/3-Components/2-Block/4-noreset)
 -  available slot properties
    - `let:props`
       - properties derived from `defaults` and props from `Params`
       - any unknown properties from params are disregarded.
       - only keys from defaults are honored.
    - [`let:key`](/3-Components/2-Block/5-key)
      - Flag that is flipped during svelte's `beforeRender`
      - Can be used together with `noreset` to granularly control which part of the template needs to be re-rendererd.

```svelte
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
</Block>
```

> Result

<Block>
    <Instance
        {defaults}
        let:props
    >
        <Component {...props} tag={"tag"}/>
    </Instance>
</Block>

<script lang="ts">
    import { onMount } from "svelte";
    import { Block, Template, Params } from "$lib";
    import Component from "../Component.svelte";
</script>

# Template component

Template component populates the same "content" for every Param component inside the Block
 -  available slot properties
    - `let:props`
       - properties derived from `defaults` and props from `Params`
       - any unknown properties from params are disregarded.
       - only keys from defaults are honored.
    - `let:tag`
      - Param identifier
 -  available properties
    - `defaults`
        - values are used to populate the prop forwarded to slot
        - use `undefined` to indicate optional property
    - `noreset`

Works hand in hand with [Params](/3-Components/2-Block/2-Params) component

```svelte
<Block>
    <Template
        defaults={{v_text: "text", v_number: 1, v_range: 0, v_select: "select", v_switch: true}}
        let:props
        let:tag
    >
        <Component {...props} {tag}/>
    </Template>

    <Params tag="first"/>
</Block>
```

> Result

<Block>
    <Template
        defaults={{ v_text: "text", v_number: 1, v_range: 3, v_select: "select", v_switch: true}}
        let:props
        let:tag
    >
        <Component {...props} {tag}/>
    </Template>

    <Params tag="first"/>
</Block>

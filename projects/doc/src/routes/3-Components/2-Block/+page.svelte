<script lang="ts">
    import { Block, Template, Params } from "$lib";
    import Component from "./Component.svelte";
</script>

# Block component

Block component does not exactly do anything in particular except to group a set of repetitive examples using other components.

Template component populates the same "content" for every Param component inside the Block
 - expects to receive `defaults`.
    - values are used to populate the prop forwarded to slot
    - use `undefined` to indicate optional property
 -  available slot properties
    - `props`
       - properties derived from `defaults` and props from `Params`
       - any unknown properties from params are disregarded.
       - only keys from defaults are honored.
    - `tag`
      - Param identifier

> Component.svelte

```svelte
<script lang="ts">
    export let tag: string;
    export let v_number: number;
    export let v_text: string;
    export let v_select: string;
    export let v_switch: boolean;
</script>

<table>
    <tr><th>{tag}</th><th>Value</th></tr>
    <tr><td>v_number</td><td>{v_number}</td></tr>
    <tr><td>v_text</td><td>{v_text}</td></tr>
    <tr><td>v_select</td><td>{v_select}</td></tr>
    <tr><td>v_switch</td><td>{v_switch}</td></tr>
</table>
```

> Block usage

```svelte
<Block>
    <Template
        defaults={{v_number: 1, v_text: "text", v_select: "select", v_switch: true}}
        let:props
        let:tag
    >
        <Component {...props} {tag}/>
    </Template>

    <Params tag="first"/>
    <Params tag="second" props={{v_number: 2}}/>
    <Params tag="third" props={{v_text: "overridden text", v_switch: false}}/>
</Block>
```

> Result

<Block>
    <Template
        defaults={{v_number: 1, v_text: "text", v_select: "select", v_switch: true}}
        let:props
        let:tag
    >
        <Component {...props} {tag}/>
    </Template>

    <Params tag="first"/>
    <Params tag="second" props={{v_number: 2}}/>
    <Params tag="third" props={{v_text: "overridden text", v_switch: false}}/>
</Block>

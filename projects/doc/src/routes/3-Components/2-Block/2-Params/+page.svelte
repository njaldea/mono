<script lang="ts">
    import { Block, Template, Params } from "$lib";
    import Component from "../Component.svelte";
</script>

# Params component

Params component is used to "repeat" the content of the Template component with different props

```svelte
<Block>
    <Template
        defaults={{ v_text: "text", v_number: 1, v_range: 0, v_select: "select", v_switch: true }}
        let:props
        let:tag
    >
        <Component {...props} {tag}/>
    </Template>

    <Params tag="first"/>
    <Params tag="second" props={{ v_number: 2 }}/>
    <Params tag="third" props={{ v_text: "overridden text", v_switch: false }}/>
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
    <Params tag="second" props={{ v_number: 2 }}/>
    <Params tag="third" props={{ v_text: "overridden text", v_switch: false }}/>
</Block>

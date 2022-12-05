# Block component

Block component is used to setup/group repetitive examples with the help of the following components:

- [Template](/3-Components/2-Block/1-Template)
- [Params](/3-Components/2-Block/2-Params)
- [Controls](/3-Components/2-Block/3-Controls)

Subsequent examples will use the component below:

```svelte
<script lang="ts">
    export let tag: string;
    export let v_text: string;
    export let v_number: number;
    export let v_range: number;
    export let v_select: string;
    export let v_switch: boolean;
</script>

<table>
    <tr><th>{tag}</th><th>Value</th></tr>
    <tr><td>v_text</td><td>{v_text}</td></tr>
    <tr><td>v_number</td><td>{v_number}</td></tr>
    <tr><td>v_range</td><td>{v_range}</td></tr>
    <tr><td>v_select</td><td>{v_select}</td></tr>
    <tr><td>v_switch</td><td>{v_switch}</td></tr>
</table>

```
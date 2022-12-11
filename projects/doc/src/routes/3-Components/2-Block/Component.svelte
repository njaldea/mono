<script lang="ts">
    export let tag: string;
    export let v_text: string;
    export let v_number: number;
    export let v_range: number;
    export let v_select: string;
    export let v_switch: boolean;
    export let v_defaulted = "default value";

    export let v_array: [number, string, boolean];
</script>

<table>
    <tr><th>{tag}</th><th>Value</th></tr>
    <tr><td>v_text</td><td>{v_text}</td></tr>
    <tr><td>v_number</td><td>{v_number}</td></tr>
    <tr><td>v_range</td><td>{v_range}</td></tr>
    <tr><td>v_select</td><td>{v_select}</td></tr>
    <tr><td>v_switch</td><td>{v_switch}</td></tr>
    <tr><td>v_array</td><td>{JSON.stringify(v_array)}</td></tr>
    <tr><td>v_defaulted</td><td>{v_defaulted}</td></tr>
</table>

<script lang="ts">
    import { getDefault } from "./misc/defaulter";

    import type { ControlText } from "./types";

    export let value: string | undefined;
    export let info: ControlText;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? (getDefault(info) as string);
    let ienabled = value !== undefined;

    $: value = ienabled && !disabled ? ivalue : undefined;
</script>

<div>
    <div style:padding-left={`${depth}px`} title={info.name}>- {info.name}</div>
    <div><input type="text" bind:value={ivalue} disabled={!ienabled || disabled} /></div>
    <div><input type="checkbox" bind:checked={ienabled} {disabled} /></div>
</div>

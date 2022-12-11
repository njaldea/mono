<script lang="ts">
    import type { ControlNumber } from "./types";

    export let value: number | undefined;
    export let info: ControlNumber;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? 0;
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

<div>
    <div style:padding-left={`${depth}px`}>- {info.name}</div>
    <div><input type="number" bind:value={ivalue} disabled={!enabled || disabled} /></div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

<script lang="ts">
    import type { ControlSwitch } from "./types";

    export let value: boolean | undefined;
    export let info: ControlSwitch;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? false;
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

<div>
    <div style:padding-left={`${depth}px`}>- {info.name}</div>
    <div><input type="checkbox" bind:checked={ivalue} disabled={!enabled || disabled} /></div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

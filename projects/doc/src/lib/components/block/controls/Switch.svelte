<script lang="ts">
    import { getDefault } from "./misc/defaulter";

    import type { ControlSwitch } from "./types";

    export let value: boolean | undefined;
    export let info: ControlSwitch;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? (getDefault(info) as boolean);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

<div>
    <div style:padding-left={`${depth}px`}>- {info.name}</div>
    <div><input type="checkbox" bind:checked={ivalue} disabled={!enabled || disabled} /></div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

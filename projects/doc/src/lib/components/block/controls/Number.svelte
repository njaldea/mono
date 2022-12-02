<script lang="ts">
    import type { ControlNumber } from "./types";

    export let value: number | undefined;
    export let info: ControlNumber;

    let ivalue = value ?? 0;
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<div>{info.name}</div>
<div><input type="number" bind:value={ivalue} disabled={!enabled} /></div>
<div><input type="checkbox" bind:checked={enabled} /></div>

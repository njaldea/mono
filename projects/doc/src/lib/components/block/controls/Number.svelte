<script lang="ts">
    import type { ControlNumber } from "./types";

    export let value: number | undefined;
    export let info: ControlNumber;

    let ivalue = value ?? 0;
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<span>{info.name}</span>
<input type="number" bind:value={ivalue} disabled={!enabled} />
<input type="checkbox" bind:checked={enabled} />

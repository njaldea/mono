<script lang="ts">
    import { getDefault } from "./misc/defaulter";
    import Name from "./misc/Name.svelte";

    import type { ControlNumber } from "./types";

    export let value: number | undefined;
    export let info: ControlNumber;
    export let depth: number;
    export let disabled = false;

    export let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

<div>
    <Name name={info.name} {depth} />
    <div><input type="number" bind:value={ivalue} disabled={!enabled || disabled} /></div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

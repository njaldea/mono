<script lang="ts">
    import type { ControlSelect } from "./types";

    export let value: string | undefined;
    export let info: ControlSelect;

    let ivalue = value ?? (info.values.length > 0 ? info.values[0] : undefined);
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<div>{info.name}</div>
<div>
    <select bind:value={ivalue} disabled={!enabled}>
        {#each info.values as value}
            <option {value}>{value}</option>
        {/each}
    </select>
</div>
<div><input type="checkbox" bind:checked={enabled} /></div>

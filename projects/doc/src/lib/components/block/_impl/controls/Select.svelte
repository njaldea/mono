<script lang="ts">
    import type { ControlSelect } from "$lib/types/controls";

    export let value: string | undefined;
    export let info: ControlSelect;

    let ivalue = value ?? (info.values.length > 0 ? info.values[0] : undefined);
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<span>{info.name}</span>
<select bind:value={ivalue} disabled={!enabled}>
    {#each info.values as value}
        <option {value}>{value}</option>
    {/each}
</select>
<input type="checkbox" bind:checked={enabled} />

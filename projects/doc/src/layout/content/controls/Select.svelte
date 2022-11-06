<script lang="ts">
    import type { ControlSelect } from '../index';

    export let value: string | undefined;
    export let info: ControlSelect;

    let ivalue = value;
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<span>{info.name}</span>
<select bind:value={ivalue}>
    {#each info.values as value}
        <option {value}>{value}</option>
    {/each}
</select>
<input type="checkbox" bind:checked={enabled} />

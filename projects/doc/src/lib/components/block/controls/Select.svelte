<script lang="ts">
    import type { ControlSelect } from "./types";

    export let value: string | undefined;
    export let info: ControlSelect;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? (info.values.length > 0 ? info.values[0] : undefined);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

<div>
    <div style:padding-left={`${depth}px`}>- {info.name}</div>
    <div>
        <select bind:value={ivalue} disabled={!enabled || disabled}>
            {#each info.values as value}
                <option {value}>{value}</option>
            {/each}
        </select>
    </div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

<script lang="ts">
    import { getDefault } from "./misc/defaulter";

    import type { ControlSelect } from "./types";

    export let value: string | undefined;
    export let info: ControlSelect;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? (getDefault(info) as string);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

<div>
    <div style:padding-left={`${depth}px`} title={info.name}>- {info.name}</div>
    <div>
        <select bind:value={ivalue} disabled={!enabled || disabled}>
            {#each info.values as value}
                <option {value}>{value}</option>
            {/each}
        </select>
    </div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

<script lang="ts">
    import { getDefault } from "./misc/defaulter";
    import Name from "./misc/Name.svelte";

    import type { ControlSelect } from "./types";

    export let value: string | undefined;
    export let info: ControlSelect;
    export let depth: number;
    export let disabled = false;

    export let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

<div>
    <Name name={info.name} {depth} />
    <div>
        <select bind:value={ivalue} disabled={!enabled || disabled}>
            {#each info.values as value}
                <option {value}>{value}</option>
            {/each}
        </select>
    </div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

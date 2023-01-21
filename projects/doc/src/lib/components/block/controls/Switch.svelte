<script lang="ts">
    import { getDefault } from "./misc/defaulter";
    import Name from "./misc/Name.svelte";

    import type { ControlSwitch } from "./types";

    export let value: boolean | undefined;
    export let info: ControlSwitch;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

<div>
    <Name name={info.name} {depth} />
    <div><input type="checkbox" bind:checked={ivalue} disabled={!enabled || disabled} /></div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

<script lang="ts">
    import type { ControlSwitch } from "./types";

    export let value: boolean | undefined;
    export let info: ControlSwitch;

    let ivalue = value ?? false;
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<div>{info.name}</div>
<div><input type="checkbox" bind:checked={ivalue} disabled={!enabled} /></div>
<div><input type="checkbox" bind:checked={enabled} /></div>

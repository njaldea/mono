<script lang="ts">
    import type { ControlSwitch } from '$lib/types/controls';

    export let value: boolean | undefined;
    export let info: ControlSwitch;

    let ivalue = value ?? false;
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<span>{info.name}</span>
<input type="checkbox" bind:checked={ivalue} disabled={!enabled} />
<input type="checkbox" bind:checked={enabled} />

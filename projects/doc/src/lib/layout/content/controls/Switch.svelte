<script lang="ts">
    import type { ControlSwitch } from '$lib/types/controls';

    export let value: boolean | undefined;
    export let info: ControlSwitch;

    let ivalue = value;
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<span>{info.name}</span>
<input type="checkbox" bind:checked={ivalue} />
<input type="checkbox" bind:checked={enabled} />

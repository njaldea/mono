<script lang="ts">
    import type { ControlNumber } from '$lib/types/controls';

    export let value: number | undefined;
    export let info: ControlNumber;

    let ivalue = value ?? info.min;
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<span>{info.name}</span>
<input
    type="number"
    bind:value={ivalue}
    min={info.min}
    max={info.max}
    step={info.step}
    disabled={!enabled}
/>
<input type="checkbox" bind:checked={enabled} />

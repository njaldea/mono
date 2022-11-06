<script lang="ts">
    import type { ControlNumber } from '../index';

    export let value: number | undefined;
    export let info: ControlNumber;

    let ivalue = value;
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<span>{info.name}</span>
<input type="number" min={info.min} max={info.max} step={info.step} bind:value={ivalue} />
<input type="checkbox" bind:checked={enabled} />

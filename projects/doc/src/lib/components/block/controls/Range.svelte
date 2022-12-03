<script lang="ts">
    import type { ControlRange } from "./types";

    export let value: number | undefined;
    export let info: ControlRange;

    let ivalue = value ?? info.min;
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<div>{info.name}</div>
<div class="input">
    <span>{ivalue}</span>
    <input
        type="range"
        bind:value={ivalue}
        min={info.min}
        max={info.max}
        step={info.step}
        disabled={!enabled}
    />
</div>
<div><input type="checkbox" bind:checked={enabled} /></div>

<style>
    .input {
        width: 100%;
        display: grid;
        grid-template-columns: 40px 1fr;
    }

    .input > span {
        text-align: center;
    }
</style>

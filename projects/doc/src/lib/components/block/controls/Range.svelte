<script lang="ts">
    import { getDefault } from "./misc/defaulter";

    import type { ControlRange } from "./types";

    export let value: number | undefined;
    export let info: ControlRange;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? (getDefault(info) as number);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

<div>
    <div style:padding-left={`${depth}px`}>- {info.name}</div>
    <div class="input">
        <div>{ivalue}</div>
        <input
            type="range"
            bind:value={ivalue}
            min={info.min}
            max={info.max}
            step={info.step}
            disabled={!enabled || disabled}
        />
    </div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

<style>
    .input {
        width: 100%;
        display: grid;
        grid-template-columns: 40px 1fr;
    }

    .input > div {
        width: 100%;
        height: 100%;
        display: grid;
        text-align: center;
        align-items: center;
        font-size: 0.8rem;
        margin: auto;
    }
</style>

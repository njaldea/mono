<script lang="ts">
    import { getDefault } from "./misc/defaulter";
    import Name from "./misc/Name.svelte";

    import type { ControlRange } from "./types";

    export let value: number | undefined;
    export let info: ControlRange;
    export let depth: number;
    export let disabled = false;

    export let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
    $: flag = !enabled || disabled;
</script>

<div>
    <Name name={info.name} {depth} />
    <div class="input">
        <div class="tooltip" class:disabled={flag}>
            Current Value: {ivalue}
        </div>
        <div>{ivalue.toFixed(2)}</div>
        <input
            type="range"
            bind:value={ivalue}
            min={info.min}
            max={info.max}
            step={info.step}
            disabled={flag}
        />
    </div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

<style>
    .input {
        width: 100%;
        display: grid;
        grid-template-columns: 40px 1fr;
        gap: 5px;
        position: relative;
    }

    .input > div {
        width: 100%;
        height: 100%;
        display: grid;
        text-align: right;
        align-items: center;
        font-size: 0.8rem;
        user-select: none;
        margin: auto;
    }

    .tooltip {
        padding-right: 10px;
        width: 100%;
        height: 100%;
        left: -110%;
        position: absolute;
        visibility: hidden;
    }

    .input:hover > .tooltip:not(.disabled) {
        visibility: visible;
    }
</style>

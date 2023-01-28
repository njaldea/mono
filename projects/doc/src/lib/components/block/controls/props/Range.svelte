<script lang="ts">
    import { getDefault } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    import type { Name, PropRange, FlatPropRange } from "../types";

    export let value: number | undefined;
    export let info: (Name & PropRange) | [string, ...FlatPropRange];
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
    $: flag = !enabled || disabled;
    $: name = info instanceof Array ? info[0] : info.name;
    $: min = info instanceof Array ? info[2] : info.min;
    $: max = info instanceof Array ? info[3] : info.max;
    $: step = info instanceof Array ? info[4] : info.step;
</script>

{#if visible}
    <div>
        <NameHeader {name} {depth} />
        <div class="input">
            <div class="tooltip" class:disabled={flag}>
                Current Value: {ivalue}
            </div>
            <div>{ivalue.toFixed(2)}</div>
            <input
                type="range"
                bind:value={ivalue}
                {min}
                {max}
                {step}
                disabled={flag}
            />
        </div>
        <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
    </div>
{/if}

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

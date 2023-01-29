<script lang="ts">
    import { getDefault } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    import type { Unionized, PropType } from "../types";

    export let value: number | undefined;
    export let info: Unionized<PropType<"range">>;
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
    $: i =
        info instanceof Array
            ? {
                  name: info[0],
                  min: info[2],
                  max: info[3],
                  step: info[4]
              }
            : {
                  name: info.name,
                  min: info.min,
                  max: info.max,
                  step: info.step
              };

    const format = (v: number, base: number, digits: number) => {
        const n = v.toExponential().split("e");
        const ex = parseInt(n[1]);
        const absex = Math.abs(ex);
        const rest = base + (absex >= 10 ? 0 : 1) - (ex >= 0 ? 0 : 1);
        return v.toLocaleString(undefined, {
            signDisplay: "always",
            useGrouping: false,
            notation: absex > 2 + digits ? "scientific" : "standard",
            maximumFractionDigits: rest,
            minimumFractionDigits: rest
        });
    };
</script>

{#if visible}
    <div>
        <NameHeader name={i.name} {depth} />
        <div class="input">
            <div class="tooltip" class:disabled={!enabled || disabled}>
                <div>Current Value:</div>
                <div>{format(ivalue, 6, 3)}</div>
            </div>
            <div>{format(ivalue, 1, 1)}</div>
            <input
                type="range"
                bind:value={ivalue}
                min={i.min}
                max={i.max}
                step={i.step}
                disabled={!enabled || disabled}
            />
        </div>
        <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
    </div>
{/if}

<style>
    .input {
        width: 100%;
        display: grid;
        grid-template-columns: 50px 1fr;
        gap: 5px;
        position: relative;
    }

    .input > div {
        width: 100%;
        height: 100%;
        display: grid;
        text-align: left;
        align-items: center;
        font-size: 0.8rem;
        user-select: none;
        margin: auto;
    }

    .tooltip {
        width: 100%;
        height: 100%;
        left: -110%;
        position: absolute;
        visibility: hidden;
        display: grid;
        grid-template-columns: 85px 1fr;
        padding: 0px 5px;
    }

    .input:hover > .tooltip:not(.disabled) {
        visibility: visible;
    }
</style>

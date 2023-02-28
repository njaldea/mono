<script lang="ts">
    import { defaulter } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";
    import { nformat } from "./misc/nformat";

    import Toggle from "svelte-toggle";

    import type { Unionized, PropType } from "../types";

    export let value: number | undefined;
    export let info: Unionized<PropType<"range">>;
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? defaulter(info);
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
</script>

{#if visible}
    <div>
        <NameHeader name={i.name} {depth} />
        <div class="input" class:disabled={!enabled || disabled}>
            <div class="tooltip">
                Value: {nformat(ivalue, 6, 11)}
            </div>
            <div>{nformat(ivalue, 3, 5)}</div>
            <input
                type="range"
                bind:value={ivalue}
                min={i.min}
                max={i.max}
                step={i.step}
                disabled={!enabled || disabled}
            />
        </div>
        <div><Toggle bind:toggled={enabled} {disabled} hideLabel small/></div>
    </div>
{/if}

<style>
    .input {
        /* TODO: align color schema for toggle */
        color-scheme: light;
        width: 100%;
        display: grid;
        grid-template-columns: 4rem 1fr;
        gap: 0.25rem;
        position: relative;
        box-sizing: border-box;
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
        left: -110%;
        width: 100%;
        height: 100%;
        display: grid;
        visibility: hidden;
        position: absolute;
        place-items: center;
    }

    .input.disabled > div {
        filter: contrast(0%);
    }

    .input:not(.disabled):hover > .tooltip {
        visibility: visible;
    }
</style>

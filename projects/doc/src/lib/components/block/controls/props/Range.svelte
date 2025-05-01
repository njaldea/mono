<script lang="ts">
    import { defaulter } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";
    import { nformat } from "./misc/nformat";
    import { getName } from "./misc/utils";

    import Toggle from "./misc/Toggle.svelte";

    import type { Unionized, PropType } from "../types";

    let {
        value = $bindable(),
        info,
        depth,
        disabled = false,
        visible = false
    } = $props<{
        value: number | undefined;
        info: Unionized<PropType<"range">>;
        depth: number;
        disabled?: boolean;
        visible?: boolean;
    }>();

    let ivalue = $state(value ?? defaulter(info));
    let enabled = $state(value !== undefined);

    const set_value = (v: boolean) => { value = v; };
    $effect(() => set_value(enabled && !disabled ? ivalue : undefined) );

    let i =
        $derived(info instanceof Array
            ? {
                  min: info[2],
                  max: info[3],
                  step: info[4]
              }
            : {
                  min: info.min,
                  max: info.max,
                  step: info.step
              });
</script>

{#if visible}
    <div>
        <NameHeader name={getName(info)} {depth} />
        <div class="input" class:disabled={!enabled || disabled}>
            <div class="tooltip">Value: {nformat(ivalue, 6, 11)}</div>
            <div>{nformat(ivalue, 3, 5)}</div>
            <input type="range" bind:value={ivalue} {...i} disabled={!enabled || disabled} />
        </div>
        <div><Toggle bind:toggled={enabled} {disabled} /></div>
    </div>
{/if}

<style>
    .input {
        width: 100%;
        display: grid;
        grid-template-columns: 4rem 1fr;
        gap: 0.25rem;
        position: relative;
        box-sizing: border-box;
    }

    .input > div {
        width: 100%;
        height: 80%;
        display: grid;
        font-size: 0.8rem;
        place-items: center;
    }

    input {
        width: 100%;
    }

    .tooltip {
        left: -110%;
        visibility: hidden;
        position: absolute;
    }

    .input.disabled {
        cursor: not-allowed;
        filter: opacity(0.5);
    }

    .input:hover > .tooltip {
        visibility: visible;
    }

    .input.disabled:hover > .tooltip {
        visibility: hidden;
    }
</style>

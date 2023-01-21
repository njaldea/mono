<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/GroupHeader.svelte";
    import { getDefault } from "./misc/defaulter";

    import type { ValueType } from "../types";
    import type { ControlTuple } from "./types";

    export let value: ValueType[] | undefined;
    export let info: ControlTuple;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = !disabled && enabled ? ivalue : undefined;
    $: values = info.values;

    let expand = info.values.length > 0 ? true : undefined;
</script>

<Header name={info.name} bind:expand bind:checked={enabled} {depth} {disabled} />

{#if expand && enabled && !disabled}
    {#each values as info, i (i)}
        <Component
            info={{ ...info, name: `${i}` }}
            bind:value={ivalue[i]}
            depth={depth + 10}
            disabled={!enabled || disabled}
        />
    {/each}
{/if}

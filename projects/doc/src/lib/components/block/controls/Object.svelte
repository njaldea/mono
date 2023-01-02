<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/GroupHeader.svelte";
    import { getDefault } from "./misc/defaulter";

    import type { ValueType } from "../types";
    import type { ControlObject } from "./types";

    export let value: Record<string, ValueType> | undefined;
    export let info: ControlObject;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = !disabled && enabled ? ivalue : undefined;
    $: values = info.values;
</script>

<Header name={info.name} bind:checked={enabled} {depth} {disabled} />

{#if enabled && !disabled}
    {#each values as info, i (i)}
        <Component
            {info}
            bind:value={ivalue[info.name]}
            depth={depth + 10}
            disabled={!enabled || disabled}
        />
    {/each}
{/if}

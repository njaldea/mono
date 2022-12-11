<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/GroupHeader.svelte";
    import { getObjectDefaults } from "./misc/defaulter";

    import type { ControlObject } from "./types";
    import type { ValueType } from "../context";

    export let value: Record<string, ValueType> | undefined;
    export let info: ControlObject;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? getObjectDefaults(info);
    let enabled = value !== undefined;

    $: value = !disabled && enabled ? ivalue : undefined;
</script>

<Header name={info.name} bind:checked={enabled} {depth} {disabled} />

{#if enabled && !disabled}
    {#each info.values as info, i (i)}
        <Component
            {info}
            bind:value={ivalue[info.name]}
            depth={depth + 10}
            disabled={!enabled || disabled}
        />
    {/each}
{/if}

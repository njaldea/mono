<script lang="ts">
    import Component from "./Component.svelte";

    import type { ControlTuple } from "./types";
    import { getTupleDefaults } from "./defaulter";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export let value: any[] | undefined;
    export let info: ControlTuple;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? getTupleDefaults(info);
    let enabled = value !== undefined;

    $: value = !disabled && enabled ? ivalue : undefined;
</script>

<div>
    <div style:padding-left={`${depth}px`}>
        > {info.name}
    </div>
    <div>-</div>
    <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
</div>

{#if enabled && !disabled}
    {#each info.values as info, i (i)}
        <Component
            info={{ ...info, name: `${i}` }}
            bind:value={ivalue[i]}
            depth={depth + 10}
            disabled={!enabled || disabled}
        />
    {/each}
{/if}

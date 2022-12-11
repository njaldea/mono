<script lang="ts">
    import Component from "./Component.svelte";

    import type { ControlObject } from "./types";
    import { getObjectDefaults } from "./defaulter";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export let value: Record<string, any> | undefined;
    export let info: ControlObject;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? getObjectDefaults(info);
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
            {info}
            bind:value={ivalue[info.name]}
            depth={depth + 10}
            disabled={!enabled || disabled}
        />
    {/each}
{/if}

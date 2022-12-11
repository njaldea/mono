<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/GroupHeader.svelte";

    import type { ControlTuple } from "./types";
    import { getTupleDefaults } from "./misc/defaulter";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export let value: any[] | undefined;
    export let info: ControlTuple;
    export let depth: number;
    export let disabled = false;

    let ivalue = value ?? getTupleDefaults(info);
    let enabled = value !== undefined;

    $: value = !disabled && enabled ? ivalue : undefined;
</script>

<Header name={info.name} bind:checked={enabled} {depth} {disabled} />

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

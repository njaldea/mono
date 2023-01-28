<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/GroupHeader.svelte";
    import { getDefault } from "./misc/defaulter";

    import type { ValueType } from "../../types";
    import type { Name, PropTuple, FlatPropTuple } from "../types";

    export let value: ValueType[] | undefined;
    export let info: (Name & PropTuple) | [string, ...FlatPropTuple];
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = !disabled && enabled ? ivalue : undefined;
    $: values = info instanceof Array ? info[2] : info.values;
    $: name = info instanceof Array ? info[0] : info.name;

    let expand = info.values.length > 0 ? true : undefined;
</script>

<Header {name} bind:expand bind:checked={enabled} {depth} {disabled} {visible} />

{#each values as v, i (i)}
    {#if v instanceof Array}
        <Component
            info={[`${i}`, ...v]}
            bind:value={ivalue[i]}
            depth={depth + 10}
            disabled={!enabled || disabled}
            visible={visible && expand && enabled && !disabled}
        />
    {:else}
        <Component
            info={{ ...v, name: `${i}` }}
            bind:value={ivalue[i]}
            depth={depth + 10}
            disabled={!enabled || disabled}
            visible={visible && expand && enabled && !disabled}
        />
    {/if}
{/each}

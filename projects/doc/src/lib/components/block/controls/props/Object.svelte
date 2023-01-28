<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/GroupHeader.svelte";
    import { getDefault } from "./misc/defaulter";

    import type { ValueType } from "../../types";
    import type { Name, PropObject, FlatPropObject } from "../types";

    export let value: Record<string, ValueType> | undefined;
    export let info: (Name & PropObject) | [string, ...FlatPropObject];
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;
    let expand = info.values.length > 0 ? true : undefined;

    $: value = !disabled && enabled ? ivalue : undefined;
    $: values = info instanceof Array ? info[2] : info.values;
    $: name = info instanceof Array ? info[0] : info.name;
</script>

<Header {name} bind:expand bind:checked={enabled} {depth} {disabled} {visible} />

{#each values as info, i (i)}
    <Component
        {info}
        bind:value={ivalue[name]}
        depth={depth + 10}
        disabled={!enabled || disabled}
        visible={visible && expand && enabled && !disabled}
    />
{/each}

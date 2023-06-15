<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/GroupHeader.svelte";
    import { defaulter } from "./misc/defaulter";
    import { getValues, getName } from "./misc/utils";

    import type { ValueType } from "../../types";
    import type { Unionized, PropType } from "../types";

    export let value: Record<string, ValueType> | undefined;
    export let info: Unionized<PropType<"object">>;
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    const ivalue = value ?? defaulter(info);
    let enabled = value !== undefined;
    let expand = getValues(info).length > 0 ? true : undefined;

    $: value = !disabled && enabled ? ivalue : undefined;
</script>

<Header name={getName(info)} bind:expand bind:checked={enabled} {depth} {disabled} {visible} />

{#each getValues(info) as v, i (i)}
    <Component
        info={v}
        bind:value={ivalue[getName(v)]}
        depth={depth + 1}
        disabled={!enabled || disabled}
        visible={visible && expand && enabled && !disabled}
    />
{/each}

<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/GroupHeader.svelte";
    import { defaulter } from "./misc/defaulter";
    import { getValues, getName } from "./misc/utils";

    import type { ValueType } from "../../types";
    import type { Unionized, PropType } from "../types";

    let {
        value = $bindable(),
        info,
        depth,
        disabled = false,
        visible = false
    }: {
        value: Record<string, ValueType> | undefined;
        info: Unionized<PropType<"table">>;
        depth: number;
        disabled?: boolean;
        visible?: boolean;
    } = $props();

    let ivalue = $state(value ?? defaulter(info));
    let enabled = $state(value !== undefined);
    let expand = $state(getValues(info).length > 0 ? true : undefined);

    const set_value = (v?: Record<string, ValueType>) => {
        value = v;
    };
    $effect(() => set_value(enabled && !disabled ? ivalue : undefined));
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

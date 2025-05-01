<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/GroupHeader.svelte";
    import { defaulter } from "./misc/defaulter";
    import { getValues, getName, addName } from "./misc/utils";

    import type { ValueType } from "../../types";
    import type { Unionized, PropType } from "../types";


    let {
        value = $bindable(),
        info,
        depth,
        disabled = false,
        visible = false
    }: {
        value: ValueType[] | undefined;
        info: Unionized<PropType<"tuple">>;
        depth: number;
        disabled?: boolean;
        visible?: boolean;
    } = $props();

    let ivalue = $state(value ?? defaulter(info));
    let enabled = $state(value !== undefined);
    let expand = $state(getValues(info).length > 0 ? true : undefined);

    const set_value = (v?: ValueType[]) => { value = v; };
    $effect(() => set_value(enabled && !disabled ? ivalue : undefined) );
</script>

<Header name={getName(info)} bind:expand bind:checked={enabled} {depth} {disabled} {visible} />

{#each getValues(info) as v, i (i)}
    <Component
        info={addName(`${i}`, v)}
        bind:value={ivalue[i]}
        depth={depth + 1}
        disabled={!enabled || disabled}
        visible={visible && expand && enabled && !disabled}
    />
{/each}

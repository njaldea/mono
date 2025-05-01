<script lang="ts">
    import Text from "./Text.svelte";
    import Number from "./Number.svelte";
    import Range from "./Range.svelte";
    import Toggle from "./Toggle.svelte";
    import Select from "./Select.svelte";
    import Tuple from "./Tuple.svelte";
    import Table from "./Table.svelte";
    import Color from "./Color.svelte";
    import Button from "./Button.svelte";

    import type { SpecialProp, Prop } from "../types";

    // by use, info type is mapped to the value type
    // unfortunately i can't use typescript in the markup part of svelte
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let {
        value = $bindable(),
        info,
        depth,
        disabled = false,
        visible = false
    }: {
        value: any;
        info: Prop | SpecialProp;
        depth: number;
        disabled?: boolean;
        visible?: boolean;
    } = $props();
</script>

{#if info instanceof Array}
    {#if "table" === info[1]}
        <Table {info} bind:value {depth} {disabled} {visible} />
    {:else if "tuple" === info[1]}
        <Tuple {info} bind:value {depth} {disabled} {visible} />
    {:else if "text" === info[1]}
        <Text {info} bind:value {depth} {disabled} {visible} />
    {:else if "color" === info[1]}
        <Color {info} bind:value {depth} {disabled} {visible} />
    {:else if "number" === info[1]}
        <Number {info} bind:value {depth} {disabled} {visible} />
    {:else if "range" === info[1]}
        <Range {info} bind:value {depth} {disabled} {visible} />
    {:else if "select" === info[1]}
        <Select {info} bind:value {depth} {disabled} {visible} />
    {:else if "toggle" === info[1]}
        <Toggle {info} bind:value {depth} {disabled} {visible} />
    {:else if "button" === info[1]}
        <Button {info} {visible} />
    {/if}
{:else if "table" === info.type}
    <Table {info} bind:value {depth} {disabled} {visible} />
{:else if "tuple" === info.type}
    <Tuple {info} bind:value {depth} {disabled} {visible} />
{:else if "text" === info.type}
    <Text {info} bind:value {depth} {disabled} {visible} />
{:else if "color" === info.type}
    <Color {info} bind:value {depth} {disabled} {visible} />
{:else if "number" === info.type}
    <Number {info} bind:value {depth} {disabled} {visible} />
{:else if "range" === info.type}
    <Range {info} bind:value {depth} {disabled} {visible} />
{:else if "select" === info.type}
    <Select {info} bind:value {depth} {disabled} {visible} />
{:else if "toggle" === info.type}
    <Toggle {info} bind:value {depth} {disabled} {visible} />
{:else if "button" === info.type}
    <Button {info} {visible} />
{/if}

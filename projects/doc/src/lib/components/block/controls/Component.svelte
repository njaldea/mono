<script lang="ts">
    import Text from "./Text.svelte";
    import Number from "./Number.svelte";
    import Range from "./Range.svelte";
    import Switch from "./Switch.svelte";
    import Select from "./Select.svelte";
    import Tuple from "./Tuple.svelte";
    import Object from "./Object.svelte";

    import type { Control } from "./types";

    export let info: Control;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export let value: any;

    export let depth = 10;
    export let disabled = false;
</script>

{#if info.type === "object"}
    <Object {info} bind:value {depth} {disabled} />
{:else if info.type === "tuple"}
    <Tuple {info} bind:value {depth} {disabled} />
{:else if info.type === "text"}
    <Text {info} bind:value {depth} {disabled} />
{:else if info.type === "number"}
    <Number {info} bind:value {depth} {disabled} />
{:else if info.type === "range"}
    <Range {info} bind:value {depth} {disabled} />
{:else if info.type === "select"}
    <Select {info} bind:value {depth} {disabled} />
{:else if info.type === "switch"}
    <Switch {info} bind:value {depth} {disabled} />
{/if}

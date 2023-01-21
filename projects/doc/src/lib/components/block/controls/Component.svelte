<script lang="ts">
    import Text from "./Text.svelte";
    import Number from "./Number.svelte";
    import Range from "./Range.svelte";
    import Switch from "./Switch.svelte";
    import Select from "./Select.svelte";
    import Tuple from "./Tuple.svelte";
    import Object from "./Object.svelte";

    import type { Control } from "./types";

    // by use, info type is mapped to the value type
    // unfortunately i can't use typescript in the markup part of svelte
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export let value: any;
    export let info: Control;
    export let depth: number;
    export let disabled = false;

    export let ivalue: any;
</script>

{#if "object" === info.type}
    <Object {info} bind:value bind:ivalue {depth} {disabled} />
{:else if "tuple" === info.type}
    <Tuple {info} bind:value bind:ivalue {depth} {disabled} />
{:else if "text" === info.type}
    <Text {info} bind:value bind:ivalue {depth} {disabled} />
{:else if "number" === info.type}
    <Number {info} bind:value bind:ivalue {depth} {disabled} />
{:else if "range" === info.type}
    <Range {info} bind:value bind:ivalue {depth} {disabled} />
{:else if "select" === info.type}
    <Select {info} bind:value bind:ivalue {depth} {disabled} />
{:else if "switch" === info.type}
    <Switch {info} bind:value bind:ivalue {depth} {disabled} />
{/if}

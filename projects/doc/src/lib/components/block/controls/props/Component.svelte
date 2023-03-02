<script lang="ts">
    import Text from "./Text.svelte";
    import Number from "./Number.svelte";
    import Range from "./Range.svelte";
    import Toggle from "./Toggle.svelte";
    import Select from "./Select.svelte";
    import Tuple from "./Tuple.svelte";
    import Object from "./Object.svelte";
    import Color from "./Color.svelte";

    import type { SpecialProp, Prop } from "../types";

    // by use, info type is mapped to the value type
    // unfortunately i can't use typescript in the markup part of svelte
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export let value: any;
    export let info: Prop | SpecialProp;
    export let depth: number;
    export let disabled = false;
    export let visible = false;
</script>

{#if info instanceof Array}
    {@const type = info[1]}
    {#if "object" === type}
        <Object {info} bind:value {depth} {disabled} {visible} />
    {:else if "tuple" === type}
        <Tuple {info} bind:value {depth} {disabled} {visible} />
    {:else if "text" === type}
        <Text {info} bind:value {depth} {disabled} {visible} />
    {:else if "color" === type}
        <Color {info} bind:value {depth} {disabled} {visible} />
    {:else if "number" === type}
        <Number {info} bind:value {depth} {disabled} {visible} />
    {:else if "range" === type}
        <Range {info} bind:value {depth} {disabled} {visible} />
    {:else if "select" === type}
        <Select {info} bind:value {depth} {disabled} {visible} />
    {:else if "toggle" === type}
        <Toggle {info} bind:value {depth} {disabled} {visible} />
    {:else if "button" === type}
        button
    {/if}
{:else}
    {@const type = info.type}
    {#if "object" === type}
        <Object {info} bind:value {depth} {disabled} {visible} />
    {:else if "tuple" === type}
        <Tuple {info} bind:value {depth} {disabled} {visible} />
    {:else if "text" === type}
        <Text {info} bind:value {depth} {disabled} {visible} />
    {:else if "color" === type}
        <Color {info} bind:value {depth} {disabled} {visible} />
    {:else if "number" === type}
        <Number {info} bind:value {depth} {disabled} {visible} />
    {:else if "range" === type}
        <Range {info} bind:value {depth} {disabled} {visible} />
    {:else if "select" === type}
        <Select {info} bind:value {depth} {disabled} {visible} />
    {:else if "toggle" === type}
        <Toggle {info} bind:value {depth} {disabled} {visible} />
    {:else if "button" === type}
        button
    {/if}
{/if}

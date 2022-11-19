<script lang="ts">
    import type { ParamValues } from "./context";
    import type { Control } from "../types";

    import Number from "./controls/Number.svelte";
    import Text from "./controls/Text.svelte";
    import Switch from "./controls/Switch.svelte";
    import Select from "./controls/Select.svelte";

    export let props: ParamValues;
    export let controls: Control[];
</script>

<div class="root">
    <div class="grid">
        <div class="header">Name</div>
        <div class="header">Value</div>
        <div class="header">In Use</div>
        {#each controls as info}
            {@const type = info.type}
            {@const name = info.name}
            {#if type === "number"}
                <Number {info} bind:value={props[name]} />
            {:else if type === "text"}
                <Text {info} bind:value={props[name]} />
            {:else if type === "select"}
                <Select {info} bind:value={props[name]} />
            {:else if type === "switch"}
                <Switch {info} bind:value={props[name]} />
            {/if}
        {/each}
    </div>
</div>

<style>
    .root {
        width: 100%;
        height: 100%;
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    .root::-webkit-scrollbar {
        display: none;
    }

    .grid {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 200px 75px;
    }

    .header {
        text-align: center;
    }
</style>

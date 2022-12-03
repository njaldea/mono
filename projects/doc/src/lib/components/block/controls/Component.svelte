<script lang="ts">
    import Text from "./Text.svelte";
    import Number from "./Number.svelte";
    import Range from "./Range.svelte";
    import Switch from "./Switch.svelte";
    import Select from "./Select.svelte";

    import type { Control } from "./types";
    import type { ParamValues } from "../context";

    export let infos: Control[];
    export let values: ParamValues;
</script>

<div class="controls">
    <div class="row">
        <div class="header">Name</div>
        <div class="header">Value</div>
        <div class="header">Use</div>
    </div>
    {#each infos as info}
        {@const type = info.type}
        {@const name = info.name}
        <div class="row">
            {#if type === "text"}
                <Text {info} bind:value={values[name]} />
            {:else if type === "number"}
                <Number {info} bind:value={values[name]} />
            {:else if type === "range"}
                <Range {info} bind:value={values[name]} />
            {:else if type === "select"}
                <Select {info} bind:value={values[name]} />
            {:else if type === "switch"}
                <Switch {info} bind:value={values[name]} />
            {/if}
        </div>
    {/each}
</div>

<style>
    .controls {
        width: 100%;
        display: grid;
        grid-auto-rows: 1fr;
    }

    .header {
        text-align: center;
    }

    .row {
        width: 100%;
        display: grid;
        padding: 2px 0px;
        grid-template-columns: 1fr 200px 75px;
        background-color: hsl(205, 50%, 5%);
    }

    .row:nth-child(even) {
        background-color: hsl(205, 15%, 15%);
    }

    .row > :global(div:nth-child(1)) {
        padding-left: 10px;
    }

    .row > :global(div) {
        display: grid;
        align-items: center;
    }

    .row > :global(div > *) {
        width: 100%;
        height: 100%;
    }
</style>

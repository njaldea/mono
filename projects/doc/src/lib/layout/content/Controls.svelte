<script lang="ts">
    import type { PropValues } from "$lib/context";
    import type { Props } from "$lib/types/controls";

    import Number from "$lib/layout/content/controls/Number.svelte";
    import Text from "$lib/layout/content/controls/Text.svelte";
    import Switch from "$lib/layout/content/controls/Switch.svelte";
    import Select from "$lib/layout/content/controls/Select.svelte";

    export let props: PropValues;
    export let controls: Props;
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
        overflow: hidden;
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

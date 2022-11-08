<script lang="ts">
    import type { Writable } from 'svelte/store';
    import type { PropValues, Controls } from '$lib/context';

    import Number from '$lib/layout/content/controls/Number.svelte';
    import Text from '$lib/layout/content/controls/Text.svelte';
    import Switch from '$lib/layout/content/controls/Switch.svelte';
    import Select from '$lib/layout/content/controls/Select.svelte';

    export let prop_values: Writable<PropValues>;
    export let controls: Writable<Controls>;
</script>

<div class="root">
    <div class="grid">
        <div class="header">Name</div>
        <div class="header">Value</div>
        <div class="header">Enabled</div>
        {#each $controls.props as prop}
            {#if prop.type === 'number'}
                <Number info={prop} bind:value={$prop_values[prop.name]} />
            {:else if prop.type === 'text'}
                <Text info={prop} bind:value={$prop_values[prop.name]} />
            {:else if prop.type === 'select'}
                <Select info={prop} bind:value={$prop_values[prop.name]} />
            {:else if prop.type === 'switch'}
                <Switch info={prop} bind:value={$prop_values[prop.name]} />
            {/if}
        {/each}
    </div>
</div>

<style>
    .root {
        width: 100%;
        height: 100%;
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

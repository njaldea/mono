<script lang="ts">
    import type { PropValues, Controls } from '$lib/context';

    import Number from '$lib/layout/content/controls/Number.svelte';
    import Text from '$lib/layout/content/controls/Text.svelte';
    import Switch from '$lib/layout/content/controls/Switch.svelte';
    import Select from '$lib/layout/content/controls/Select.svelte';

    export let props: PropValues;
    export let controls: Controls;
</script>

<div class="root">
    <div class="grid">
        <div class="header">Name</div>
        <div class="header">Value</div>
        <div class="header">Enabled</div>
        {#each controls.props as prop}
            {@const name = prop.name}
            {#if prop.type === 'number'}
                <Number info={prop} bind:value={props[name]} />
            {:else if prop.type === 'text'}
                <Text info={prop} bind:value={props[name]} />
            {:else if prop.type === 'select'}
                <Select info={prop} bind:value={props[name]} />
            {:else if prop.type === 'switch'}
                <Switch info={prop} bind:value={props[name]} />
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

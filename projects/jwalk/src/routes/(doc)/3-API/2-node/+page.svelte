<script lang="ts">
    import NonGroup from "./NonGroup.svelte";
    import List from "./List.svelte";
    import Tuple from "./Tuple.svelte";
    import Map from "./Map.svelte";
    import ObjectC from "./Object.svelte";

    const mapping = {
        nongroup: NonGroup,
        list: List,
        map: Map,
        tuple: Tuple,
        object: ObjectC
    };

    let selected: keyof typeof mapping = "nongroup";
</script>

<h1><code>jwalker().node(...)</code></h1>

<div>
    {#each Object.keys(mapping) as name}
        <label class:selected={selected === name}>
            <input type="radio" bind:group={selected} name="shown" value={name} />
            {name}
        </label>
    {/each}
</div>
<br />

<svelte:component this={mapping[selected]} />

<style>
    div {
        gap: 2px;
        height: 36px;
        display: grid;
        user-select: none;
        grid-template-columns: 100px 100px 100px 100px 100px;
    }

    label {
        display: grid;
        place-items: center;
        cursor: pointer;
    }

    .selected {
        outline: 1px solid blue;
    }

    input {
        display: none;
    }
</style>

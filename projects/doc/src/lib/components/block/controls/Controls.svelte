<script lang="ts">
    import Header from "./Header.svelte";
    import Component from "./Component.svelte";

    import type { Control } from "./types";
    import type { Params } from "../context";

    export let infos: Control[];
    export let values: Params;
</script>

<div class="controls">
    <Header />
    {#each infos as info}
        <Component {info} bind:value={values[info.name]} />
    {/each}
</div>

<style>
    .controls {
        width: 100%;
        display: grid;
        grid-auto-rows: 1fr;
    }

    .controls > :global(div) {
        width: 100%;
        display: grid;
        padding: 2px 0px;
        grid-template-columns: 1fr 200px 75px;
        background-color: hsl(205, 50%, 5%);
    }

    .controls > :global(div:nth-child(even)) {
        background-color: hsl(205, 15%, 15%);
    }

    .controls > :global(div > div) {
        display: grid;
        align-items: center;
    }

    .controls > :global(div > div > *) {
        width: 100%;
        height: 100%;
    }
</style>

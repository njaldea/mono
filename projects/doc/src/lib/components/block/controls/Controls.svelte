<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/TopHeader.svelte";
    import Styler from "./misc/Styler.svelte";

    import type { Control } from "./types";
    import type { Params } from "../context";

    export let infos: Control[];
    export let values: Params;
</script>

<Styler>
    <Header />
    {#each infos as info}
        <Component {info} bind:value={values[info.name]} />
    {/each}
</Styler>

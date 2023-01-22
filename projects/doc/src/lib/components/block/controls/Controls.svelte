<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/TopHeader.svelte";
    import Styler from "./misc/Styler.svelte";

    import type { ValueType } from "../types";
    import type { Control } from "./types";

    export let infos: Control[];
    export let values: Record<string, ValueType>;
</script>

<Styler>
    <Header />
    {#each infos as info}
        <Component {info} bind:value={values[info.name]} depth={10} visible />
    {/each}
</Styler>

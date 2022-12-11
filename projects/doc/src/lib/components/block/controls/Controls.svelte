<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/TopHeader.svelte";
    import Styler from "./misc/Styler.svelte";

    import type { Control } from "./types";
    import type { ValueType } from "../context";

    export let infos: Control[];
    export let values: Record<string, ValueType>;
</script>

<Styler>
    <Header />
    {#each infos as info}
        <Component {info} bind:value={values[info.name]} depth={10} disabled={false} />
    {/each}
</Styler>

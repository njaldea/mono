<script lang="ts">
    import Component from "./Component.svelte";
    import Header from "./misc/TopHeader.svelte";
    import Styler from "./misc/Styler.svelte";

    import type { Control } from "./types";

    export let infos: Control[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export let values: Record<string, any>;
</script>

<Styler>
    <Header />
    {#each infos as info}
        <Component {info} bind:value={values[info.name]} />
    {/each}
</Styler>

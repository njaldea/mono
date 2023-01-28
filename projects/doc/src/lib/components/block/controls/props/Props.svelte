<script lang="ts">
    import Component from "./Component.svelte";
    import Styler from "./misc/Styler.svelte";

    import type { ValueType } from "../../types";
    import type { Prop } from "../types";

    export let infos: Prop[];
    export let values: Record<string, ValueType>;

    export let visible: boolean;
</script>

<Styler>
    {#if visible}
        <slot />
    {/if}
    {#each infos as info}
        {#if info instanceof Array}
            <Component {info} bind:value={values[info[0]]} depth={10} {visible} />
        {:else}
            <Component {info} bind:value={values[info.name]} depth={10} {visible} />
        {/if}
    {/each}
</Styler>

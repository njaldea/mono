<script lang="ts">
    import Component from "./Component.svelte";
    import Styler from "./misc/Styler.svelte";
    import { getName } from "./misc/utils";

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
        <Component {info} bind:value={values[getName(info)]} depth={1} {visible} />
    {/each}
</Styler>

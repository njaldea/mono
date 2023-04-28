<script lang="ts">
    import Component from "./Component.svelte";
    import { getName } from "./misc/utils";

    import type { ValueType } from "../../types";
    import type { SpecialProp, Prop } from "../types";

    export let infos: (SpecialProp | Prop)[];
    export let values: Record<string, ValueType>;

    export let visible: boolean;
</script>

{#each infos as info}
    <Component {info} bind:value={values[getName(info)]} depth={1} {visible} />
{/each}

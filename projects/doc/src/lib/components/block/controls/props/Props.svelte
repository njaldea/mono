<script lang="ts">
    import Component from "./Component.svelte";
    import { getName } from "./misc/utils";

    import type { SpecialProp, Prop } from "../types";
    import type { ControlValue } from "../../context";
    import type { Writable } from "svelte/store";

    let {
        infos,
        values,
        visible
    }: {
        infos: (SpecialProp | Prop)[];
        values: Writable<ControlValue>;
        visible: boolean;
    } = $props();
</script>

{#each infos as info}
    <Component {info} depth={1} {visible} bind:value={$values.props[getName(info)]} />
{/each}

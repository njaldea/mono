<script lang="ts">
    import { getName } from "./misc/utils";
    import { defaulter } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    // TODO: currently, this does not follow font-size adjustments
    // thus, it is possible to have large font size with toggle for ants
    import Toggle from "svelte-toggle";

    import type { Unionized, PropType } from "../types";

    export let value: boolean | undefined;
    export let info: Unionized<PropType<"toggle">>;
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? defaulter(info);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

{#if visible}
    <div>
        <NameHeader name={getName(info)} {depth} />
        <div style="margin: auto"><Toggle bind:toggled={ivalue} disabled={!enabled || disabled} hideLabel small/></div>
        <div><Toggle bind:toggled={enabled} {disabled} hideLabel small/></div>
    </div>
{/if}

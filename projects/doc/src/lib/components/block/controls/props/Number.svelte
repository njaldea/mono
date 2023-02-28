<script lang="ts">
    import { getName } from "./misc/utils";
    import { defaulter } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    import Toggle from "svelte-toggle";

    import type { Unionized, PropType } from "../types";

    export let value: number | undefined;
    export let info: Unionized<PropType<"number">>;
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
        <div><input type="number" bind:value={ivalue} disabled={!enabled || disabled} /></div>
        <div><Toggle bind:toggled={enabled} {disabled} hideLabel small/></div>
    </div>
{/if}

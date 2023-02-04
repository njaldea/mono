<script lang="ts">
    import { getName } from "./misc/utils";
    import { defaulter } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    import type { Unionized, PropType } from "../types";

    export let value: boolean | undefined;
    export let info: Unionized<PropType<"switch">>;
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
        <div><input type="checkbox" bind:checked={ivalue} disabled={!enabled || disabled} /></div>
        <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
    </div>
{/if}

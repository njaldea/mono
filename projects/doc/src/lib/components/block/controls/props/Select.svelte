<script lang="ts">
    import { defaulter } from "./misc/defaulter";
    import { getValues, getName } from "./misc/utils";
    import NameHeader from "./misc/Name.svelte";

    import Toggle from "svelte-toggle";

    import type { Unionized, PropType } from "../types";

    export let value: string | undefined;
    export let info: Unionized<PropType<"select">>;
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
        <div>
            <select class="control" bind:value={ivalue} disabled={!enabled || disabled}>
                {#each getValues(info) as v}
                    <option value={v}>{v}</option>
                {/each}
            </select>
        </div>
        <div><Toggle bind:toggled={enabled} {disabled} hideLabel small /></div>
    </div>
{/if}

<style>
    select {
        text-align: center;
    }
</style>

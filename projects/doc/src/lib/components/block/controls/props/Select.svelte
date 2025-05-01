<script lang="ts">
    import { defaulter } from "./misc/defaulter";
    import { getValues, getName } from "./misc/utils";
    import NameHeader from "./misc/Name.svelte";

    import Toggle from "./misc/Toggle.svelte";

    import type { Unionized, PropType } from "../types";

    let {
        value = $bindable(),
        info,
        depth,
        disabled = false,
        visible = false
    }: {
        value: string | undefined;
        info: Unionized<PropType<"select">>;
        depth: number;
        disabled?: boolean;
        visible?: boolean;
    } = $props();

    let ivalue = $state(value ?? defaulter(info));
    let enabled = $state(value !== undefined);

    const set_value = (v?: string) => {
        value = v;
    };
    $effect(() => set_value(enabled && !disabled ? ivalue : undefined));
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
        <div><Toggle bind:toggled={enabled} {disabled} /></div>
    </div>
{/if}

<style>
    select {
        text-align: center;
    }
</style>

<script lang="ts">
    import { getDefault } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    import type { Unionized, PropType } from "../types";

    export let value: string | undefined;
    export let info: Unionized<PropType<"select">>;
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
    $: name = info instanceof Array ? info[0] : info.name;
    $: values = info instanceof Array ? info[2] : info.values;
</script>

{#if visible}
    <div>
        <NameHeader {name} {depth} />
        <div>
            <select bind:value={ivalue} disabled={!enabled || disabled}>
                {#each values as v}
                    <option value={v}>{v}</option>
                {/each}
            </select>
        </div>
        <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
    </div>
{/if}

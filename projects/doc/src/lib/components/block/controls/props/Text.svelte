<script lang="ts">
    import { getDefault } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    import type { Unionized, PropType } from "../types";

    export let value: string | undefined;
    export let info: Unionized<PropType<"text">>;
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? (getDefault(info) as string);
    let ienabled = value !== undefined;

    $: value = ienabled && !disabled ? ivalue : undefined;
    $: name = info instanceof Array ? info[0] : info.name;
</script>

{#if visible}
    <div>
        <NameHeader {name} {depth} />
        <div><input type="text" bind:value={ivalue} disabled={!ienabled || disabled} /></div>
        <div><input type="checkbox" bind:checked={ienabled} {disabled} /></div>
    </div>
{/if}

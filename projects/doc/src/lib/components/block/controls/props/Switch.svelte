<script lang="ts">
    import { getDefault } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    import type { Name, PropSwitch, FlatPropSwitch } from "../types";

    export let value: boolean | undefined;
    export let info: (Name & PropSwitch) | [string, ...FlatPropSwitch];
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? getDefault(info);
    let enabled = value !== undefined;

    $: value = enabled && !disabled ? ivalue : undefined;
    $: name = info instanceof Array ? info[0] : info.name;
</script>

{#if visible}
    <div>
        <NameHeader {name} {depth} />
        <div><input type="checkbox" bind:checked={ivalue} disabled={!enabled || disabled} /></div>
        <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
    </div>
{/if}

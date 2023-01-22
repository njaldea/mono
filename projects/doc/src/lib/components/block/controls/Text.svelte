<script lang="ts">
    import { getDefault } from "./misc/defaulter";
    import Name from "./misc/Name.svelte";

    import type { ControlText } from "./types";

    export let value: string | undefined;
    export let info: ControlText;
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? (getDefault(info) as string);
    let ienabled = value !== undefined;

    $: value = ienabled && !disabled ? ivalue : undefined;
</script>

{#if visible}
    <div>
        <Name name={info.name} {depth} />
        <div><input type="text" bind:value={ivalue} disabled={!ienabled || disabled} /></div>
        <div><input type="checkbox" bind:checked={ienabled} {disabled} /></div>
    </div>
{/if}

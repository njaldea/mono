<script lang="ts">
    import type { ControlText } from "$lib/types/controls";

    export let value: string | undefined;
    export let info: ControlText;

    let ivalue = value ?? "";
    let enabled = value !== undefined;

    $: value = enabled ? ivalue : undefined;
</script>

<span>{info.name}</span>
<input type="text" bind:value={ivalue} disabled={!enabled} />
<input type="checkbox" bind:checked={enabled} />

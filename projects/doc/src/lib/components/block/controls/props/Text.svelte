<script lang="ts">
    import { getName } from "./misc/utils";
    import { defaulter } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    import Toggle from "./misc/Toggle.svelte";

    import type { Unionized, PropType } from "../types";

    export let value: string | undefined;
    export let info: Unionized<PropType<"text">>;
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
            <input
                class="control"
                type="text"
                bind:value={ivalue}
                disabled={!enabled || disabled}
            />
        </div>
        <div><Toggle bind:toggled={enabled} {disabled} /></div>
    </div>
{/if}

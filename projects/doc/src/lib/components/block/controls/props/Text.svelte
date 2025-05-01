<script lang="ts">
    import { getName } from "./misc/utils";
    import { defaulter } from "./misc/defaulter";
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
        info: Unionized<PropType<"text">>;
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

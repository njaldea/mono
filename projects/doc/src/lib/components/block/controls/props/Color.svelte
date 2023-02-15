<script lang="ts" context="module">
    import type { Unionized, PropType, Detailed } from "../types";
    import Picker from "vanilla-picker";

    const colorSetter = (
        format: Detailed<PropType<"color">>["format"],
        color: Parameters<Picker["onChange"]>[0]
    ) => {
        switch (format) {
            case "hex":
                return color.hex.substring(0, 7);
            case "hexa":
                return color.hex.substring(0, 9);
            case "hsl":
                return color.hslString;
            case "hsla":
                return color.hslaString;
            case "rgb":
                return color.rgbString;
            case "rgba":
                return color.rgbaString;
        }
    };
</script>

<script lang="ts">
    import { getName, getFormat } from "./misc/utils";
    import { defaulter } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    export let value: string | undefined;
    export let info: Unionized<PropType<"color">>;
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? defaulter(info);
    let enabled = value !== undefined;

    type Format = Detailed<PropType<"color">>["format"];
    type EditorFormat = "hex" | "rgb" | "hsl";

    const action = (d: HTMLElement, format: Format) => {
        d.style.borderColor = ivalue;
        const picker = new Picker({
            parent: d,
            popup: "left",
            editorFormat: format.substring(0, 3) as EditorFormat,
            editor: false,
            alpha: format.length === 4,
            onChange: (color) => {
                ivalue = colorSetter(getFormat(info), color);
                d.style.borderColor = ivalue;
            },
            color: ivalue
        });
        return {
            update: (format: Format) => {
                picker.setOptions({
                    alpha: format.length === 4,
                    editorFormat: format.substring(0, 3) as EditorFormat
                });
            },
            destroy: () => picker.destroy()
        };
    };

    $: value = enabled && !disabled ? ivalue : undefined;
</script>

{#if visible}
    <div>
        <NameHeader name={getName(info)} {depth} />
        <button use:action={getFormat(info)} disabled={!enabled || disabled}>
            {ivalue}
        </button>
        <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
    </div>
{/if}

<style>
    button {
        font-size: 0.6rem;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 10px;
        border-right-width: 10px;
        border-style: solid;
        background-color: var(--i-nil-doc-bg-color);
        outline: 1px solid gray;
        margin-top: 3px;
        margin-bottom: 3px;
    }

    button :global(.picker_wrapper),
    button :global(.picker_arrow),
    button :global(.picker_arrow::before),
    button :global(.picker_arrow::after) {
        background-color: var(--i-nil-doc-bg-color) !important;
    }

    button :global(.picker_done > button) {
        background-image: initial;
        background-color: var(--i-nil-doc-bg-color);
        color: var(--i-nil-doc-color);
    }
</style>

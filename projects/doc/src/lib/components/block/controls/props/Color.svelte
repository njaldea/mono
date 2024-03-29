<script lang="ts" context="module">
    import type Picker from "vanilla-picker";
    import type { Unionized, PropType, Detailed } from "../types";

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
            default:
                return color.rgbaString;
        }
    };
</script>

<script lang="ts">
    import { getName, getFormat } from "./misc/utils";
    import { defaulter } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    import Toggle from "./misc/Toggle.svelte";

    export let value: string | undefined;
    export let info: Unionized<PropType<"color">>;
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? defaulter(info);
    let enabled = value !== undefined;

    type Format = Detailed<PropType<"color">>["format"];
    type EditorFormat = "hex" | "rgb" | "hsl";

    const action = (d: HTMLElement, { format, P }: { format: Format; P: typeof Picker }) => {
        d.style.borderColor = ivalue;
        const picker = new P({
            parent: d,
            popup: "left",
            editorFormat: format.substring(0, 3) as EditorFormat,
            editor: true,
            alpha: 4 === format.length,
            onChange: (color) => {
                ivalue = colorSetter(getFormat(info), color);
                d.style.borderColor = ivalue;
            },
            color: ivalue
        });
        return {
            update: (format: Format) => {
                picker.setOptions({
                    alpha: 4 === format.length,
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
        <div>
            {#await import("vanilla-picker")}
                <button>
                    {ivalue}
                </button>
            {:then { default: P }}
                <button
                    style:height="1.5rem"
                    style:width="12.5rem"
                    use:action={{ format: getFormat(info), P }}
                    disabled={!enabled || disabled}
                >
                    {ivalue}
                </button>
            {/await}
        </div>
        <div><Toggle bind:toggled={enabled} {disabled} /></div>
    </div>
{/if}

<style>
    button {
        position: absolute;
        font-size: 0.7rem;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 10px;
        border-right-width: 10px;
        border-style: solid;
        background-color: var(--i-nil-doc-bg-color);
        color: var(--i-nil-doc-color);
        outline: 1px solid gray;
    }

    button[disabled] {
        border-color: gray !important;
    }

    button :global(.popup.popup_top) {
        left: -1.3rem !important;
        color: var(--i-nil-doc-color) !important;
        box-shadow: currentColor 0px 0px 10px 0px !important;
    }

    button :global(.picker_wrapper),
    button :global(.picker_arrow),
    button :global(.picker_arrow::before),
    button :global(.picker_arrow::after) {
        background-color: var(--i-nil-doc-bg-color) !important;
    }

    button :global(.picker_done > button) {
        background: var(--i-nil-doc-bg-color) !important;
        color: var(--i-nil-doc-color) !important;
    }
</style>

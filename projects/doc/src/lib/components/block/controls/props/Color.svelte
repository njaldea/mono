<script lang="ts" context="module">
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
                return color.rgbaString;
        }
    };

    const formatter = (format: Detailed<PropType<"color">>["format"]) => {
        switch (format) {
            case "hex":
                return "hex";
            case "hsl":
                return "hsl";
            case "rgb":
                return "rgb";
            case "hexa":
                return "hex";
            case "hsla":
                return "hsl";
            case "rgba":
                return "rgb";
        }
    };
</script>

<script lang="ts">
    import { getName, getFormat } from "./misc/utils";
    import { defaulter } from "./misc/defaulter";
    import NameHeader from "./misc/Name.svelte";

    import Picker from "vanilla-picker";

    export let value: string | undefined;
    export let info: Unionized<PropType<"color">>;
    export let depth: number;
    export let disabled = false;
    export let visible = false;

    let ivalue = value ?? defaulter(info);
    let enabled = value !== undefined;

    const action = (div: HTMLButtonElement, format: Detailed<PropType<"color">>["format"]) => {
        const picker = new Picker({
            parent: div,
            popup: "left",
            editorFormat: formatter(format),
            editor: false,
            alpha: format.length === 4,
            onChange: (color) => (ivalue = colorSetter(getFormat(info), color)),
            color: ivalue
        });
        return {
            update: (format: Detailed<PropType<"color">>["format"]) => {
                picker.setOptions({
                    alpha: format.length === 4,
                    editorFormat: formatter(format)
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
            <button use:action={getFormat(info)} disabled={!enabled || disabled}>
                {value}
            </button>
        </div>
        <div><input type="checkbox" bind:checked={enabled} {disabled} /></div>
    </div>
{/if}

<style>
    div > div > button {
        font-size: 0.7rem;
    }
</style>

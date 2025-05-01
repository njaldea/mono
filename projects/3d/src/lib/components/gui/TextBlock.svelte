<script lang="ts">
    import Control from "$lib/components/gui/Control.svelte";

    import { getCurrentUIContainer } from "$lib/core/context/ui";

    import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock.js";

    let {
        text,
        control = new TextBlock()
    }: {
        text: string;
        control?: TextBlock;
    } = $props();

    const container = getCurrentUIContainer();

    $effect(() => {
        control.text = text;
    });
</script>

<Control {container} {control} />

<script lang="ts">
    import Control from "$lib/components/gui/Control.svelte";

    import { getCurrentUIContainer } from "$lib/core/context/ui";

    import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock.js";

    export let text: string;

    const container = getCurrentUIContainer();

    export let control = new TextBlock();
    $: control.text = text;
</script>

<Control {container} {control} />

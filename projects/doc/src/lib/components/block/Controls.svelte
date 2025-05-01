<script lang="ts">
    import type { SpecialProp, Prop, Event } from "./controls/types";
    import { getControls } from "./context";

    let {
        props = [],
        events = []
    }: {
        props?: (Prop | SpecialProp)[];
        events?: Event[];
    } = $props();

    const controls = getControls();
    $effect(() => controls.set({ props, events }));
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/3-Block/2-Controls) for more details.
-->

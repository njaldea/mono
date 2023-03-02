<script lang="ts">
    import type { SpecialProp, Prop, Event } from "./controls/types";
    import { getControls, getControlsState } from "./context";

    export let props: (Prop | SpecialProp)[] = [];
    export let events: Event[] = [];
    export let position: "hidden" | "bottom" | "right" = "bottom";
    export let mode: "prop" | "event" = "prop";

    const controls = getControls();
    $: $controls = { props, events };

    const state = getControlsState();
    $: $state = { position, mode };
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/2-Block/2-Controls) for more details.
-->

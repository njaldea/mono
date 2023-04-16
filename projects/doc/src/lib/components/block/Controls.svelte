<script lang="ts">
    import type { SpecialProp, Prop, Event } from "./controls/types";
    import { getControls } from "./context";

    export let props: (Prop | SpecialProp)[] = [];
    export let events: Event[] = [];

    const controls = getControls();
    $: $controls = { props, events };
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/2-Block/2-Controls) for more details.
-->

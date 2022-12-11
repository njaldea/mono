<script lang="ts">
    import component from "$lib/components/block/controls/Switch.svelte";
    import type { ControlSwitch as Info } from "$lib/components/block/controls/types";

    import Layout from "../Layout.md.svelte";

    let name1: boolean | undefined = undefined;
    let name2: boolean | undefined = true;
    let name3: boolean | undefined = false;

    const info = (name: string): Info => ({ name, type: "switch" });
</script>

<Layout
    {name1}
    {name2}
    {name3}
    {info}
    {component}
/>

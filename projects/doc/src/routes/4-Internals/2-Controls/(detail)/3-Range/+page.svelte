<script lang="ts">
    import component from "$lib/components/block/controls/Range.svelte";
    import type { ControlRange as Info } from "$lib/components/block/controls/types";

    import Layout from "../Layout.md.svelte";

    let name1: number | undefined = undefined;
    let name2: number | undefined = 10;
    let name3: number | undefined = 20;

    const info = (name: string): Info => ({
        name,
        type: "range",
        min: 10,
        max: 20,
        step: 0.1
    });
</script>

<Layout
    {name1}
    {name2}
    {name3}
    {info}
    {component}
/>

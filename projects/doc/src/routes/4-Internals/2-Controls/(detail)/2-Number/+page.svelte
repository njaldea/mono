<script lang="ts">
    import component from "$lib/components/block/controls/Number.svelte";
    import type { ControlNumber as Info } from "$lib/components/block/controls/types";

    import Layout from "../Layout.md.svelte";

    let name1: number | undefined = undefined;
    let name2: number | undefined = 1;
    let name3: number | undefined = 2;

    const info = (name: string): Info => ({ name, type: "number" });
</script>

<Layout
    {name1}
    {name2}
    {name3}
    {info}
    {component}
/>

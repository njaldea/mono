<script lang="ts">
    import component from "$lib/components/block/controls/Select.svelte";
    import type { ControlSelect as Info } from "$lib/components/block/controls/types";

    import Layout from "../Layout.md.svelte";

    let name1: string | undefined = undefined;
    let name2: string | undefined = "value1";
    let name3: string | undefined = "value2";

    const info = (name: string): Info => ({
        name,
        type: "select",
        values: ["value1", "value2"]
    });
</script>

<Layout
    {name1}
    {name2}
    {name3}
    {info}
    {component}
/>

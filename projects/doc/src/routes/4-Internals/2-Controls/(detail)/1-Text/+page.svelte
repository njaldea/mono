<script lang="ts">
    import component from "$lib/components/block/controls/Text.svelte";
    import type { ControlText as Info } from "$lib/components/block/controls/types";

    import Layout from "../Layout.md.svelte";

    let name1: string | undefined = undefined;
    let name2: string | undefined = "hello";
    let name3: string | undefined = "world";

    const info = (name: string): Info => ({ name, type: "text" });
</script>

<Layout
    {name1}
    {name2}
    {name3}
    {info}
    {component}
/>
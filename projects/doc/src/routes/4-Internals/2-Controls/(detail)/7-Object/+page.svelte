<script lang="ts">
    import component from "$lib/components/block/controls/Object.svelte";
    import type { ControlObject as Info } from "$lib/components/block/controls/types";

    import Layout from "../Layout.md.svelte";

    type T = { v1: string, v2: number };

    let name1: T | undefined = undefined;
    let name2: T | undefined = { v1: "hello", v2: 1101 };
    let name3: T | undefined = { v1: "world", v2: 1102 };

    const info = (name: string): Info => ({
        name,
        type: "object",
        values: [
            {
                name: "v1",
                type: "text",
            },
            {
                name: "v2",
                type: "range",
                min: 2,
                max: 12,
                step: 0.1
            }
        ]
    });
</script>

<Layout
    {name1}
    {name2}
    {name3}
    {info}
    {component}
    stringify
/>

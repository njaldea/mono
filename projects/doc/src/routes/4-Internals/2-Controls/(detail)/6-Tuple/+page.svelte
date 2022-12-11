<script lang="ts">
    import component from "$lib/components/block/controls/Tuple.svelte";
    import type { ControlTuple as Info } from "$lib/components/block/controls/types";

    import Layout from "../Layout.md.svelte";

    type T = [number, number];

    let name1: T | undefined = undefined;
    let name2: T | undefined = [3, 5];
    let name3: T | undefined = [6, 8];

    const info = (name: string): Info => ({
        name,
        type: "tuple",
        values: [
            {
                type: "number",
            },
            {
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

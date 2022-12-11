<script lang="ts">
    import Tuple from "$lib/components/block/controls/Tuple.svelte";
    import type { ControlTuple } from "$lib/components/block/controls/types";

    type T = [number, number];

    let value1: T | undefined = undefined;
    let value2: T | undefined = [3, 5];
    let value3: T | undefined = [6, 8];

    function makeInfo(name: string): ControlTuple
    {
        return {
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
        };
    }
</script>

| variable | value |
| -------- | ----- |
| name1    | {JSON.stringify(value1)} |
| name2    | {JSON.stringify(value2)} |
| name3    | {JSON.stringify(value3)} |

<div class="demo">
    <div class="demo">
        <div class="header">Name</div>
        <div class="header">Value</div>
        <div class="header">Use</div>
    </div>
    <Tuple info={makeInfo("name1")} bind:value={value1} depth={10}/>
    <Tuple info={makeInfo("name2")} bind:value={value2} depth={20}/>
    <Tuple info={makeInfo("name3")} bind:value={value3} depth={30} disabled/>
</div>

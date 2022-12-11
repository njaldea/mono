<script lang="ts">
    import Object from "$lib/components/block/controls/Object.svelte";
    import type { ControlObject } from "$lib/components/block/controls/types";

    type T = { v1: string, v2: number };

    let value1: T | undefined = undefined;
    let value2: T | undefined = { v1: "hello", v2: 1101 };
    let value3: T | undefined = { v1: "world", v2: 1102 };

    function makeInfo(name: string): ControlObject
    {
        return {
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
    <Object info={makeInfo("name1")} bind:value={value1} depth={30}/>
    <Object info={makeInfo("name2")} bind:value={value2} depth={20}/>
    <Object info={makeInfo("name3")} bind:value={value3} depth={10} disabled/>
</div>

<script lang="ts">
    import Range from "$lib/components/block/controls/Range.svelte";
    import type { ControlRange } from "$lib/components/block/controls/types";

    let value1: number | undefined = undefined;
    let value2: number | undefined = 10;
    let value3: number | undefined = 20;

    function makeInfo(name: string): ControlRange
    {
        return {
            name,
            type: "range",
            min: 10,
            max: 20,
            step: 0.1
        };
    }
</script>

| variable | value |
| -------- | ----- |
| name1    | {value1} |
| name2    | {value2} |
| name3    | {value3} |

<div class="demo">
    <div class="demo">
        <div class="header">Name</div>
        <div class="header">Value</div>
        <div class="header">Use</div>
    </div>
    <Range info={makeInfo("name1")} bind:value={value1} depth={10}/>
    <Range info={makeInfo("name2")} bind:value={value2} depth={20}/>
    <Range info={makeInfo("name3")} bind:value={value3} depth={30} disabled/>
</div>

<script lang="ts">
    import Number from "$lib/components/block/controls/Number.svelte";
    import type { ControlNumber } from "$lib/components/block/controls/types";

    let value1: number | undefined = undefined;
    let value2: number | undefined = 1;
    let value3: number | undefined = 2;

    function makeInfo(name: string): ControlNumber
    {
        return { name, type: "number" };
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
    <Number info={makeInfo("name1")} bind:value={value1} depth={10}/>
    <Number info={makeInfo("name2")} bind:value={value2} depth={20}/>
    <Number info={makeInfo("name3")} bind:value={value3} depth={30} disabled/>
</div>

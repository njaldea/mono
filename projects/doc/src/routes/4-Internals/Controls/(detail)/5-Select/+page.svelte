<script lang="ts">
    import Select from "$lib/components/block/controls/Select.svelte";
    import type { ControlSelect } from "$lib/components/block/controls/types";

    let value1: string | undefined = undefined;
    let value2: string | undefined = "value1";
    let value3: string | undefined = "value2";

    function makeInfo(name: string): ControlSelect
    {
        return { name, type: "select", values: ["value1", "value2"] };
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
    <Select info={makeInfo("name1")} bind:value={value1} depth={10}/>
    <Select info={makeInfo("name2")} bind:value={value2} depth={20}/>
    <Select info={makeInfo("name3")} bind:value={value3} depth={30} disabled/>
</div>

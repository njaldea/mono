<script lang="ts">
    import Text from "$lib/components/block/controls/Text.svelte";
    import type { ControlText } from "$lib/components/block/controls/types";

    let value1: string | undefined = undefined;
    let value2: string | undefined = "hello";
    let value3: string | undefined = "world";

    function makeInfo(name: string): ControlText
    {
        return { name, type: "text" };
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
    <Text info={makeInfo("name1")} bind:value={value1} depth={10}/>
    <Text info={makeInfo("name2")} bind:value={value2} depth={20}/>
    <Text info={makeInfo("name3")} bind:value={value3} depth={30} disabled/>
</div>

<script lang="ts">
    import Switch from "$lib/components/block/controls/Switch.svelte";
    import type { ControlSwitch } from "$lib/components/block/controls/types";

    let value1: boolean | undefined = undefined;
    let value2: boolean | undefined = true;
    let value3: boolean | undefined = false;

    function makeInfo(name: string): ControlSwitch
    {
        return { name, type: "switch" };
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
    <Switch info={makeInfo("name1")} bind:value={value1} depth={10}/>
    <Switch info={makeInfo("name2")} bind:value={value2} depth={20}/>
    <Switch info={makeInfo("name3")} bind:value={value3} depth={30} disabled/>
</div>

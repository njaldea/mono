<script lang="ts">
    import { Block, Instance, Controls } from "$lib";
    import Split from "$lib/layout/Split2.svelte";

    import Content from "./Content.svelte";
</script>

{#snippet snippet1()}
    <div class="content">
        <Content name="A"/>
    </div>
{/snippet}
{#snippet snippet2()}
    <div class="content">
        <Content name="B"/>
    </div>
{/snippet}
{#snippet snippet3()}
    <div class="content">
        <Content name="C"/>
    </div>
{/snippet}
<Block>
    <Instance defaults={{ vertical: false, b: false }}>
        {#snippet children({ values: { vertical, b } })}
            <div class="container">
                <Split widths={[null, 250, null]} snippets={[snippet1, snippet2, snippet3]}/>
            </div>
        {/snippet}
    </Instance>
    <Controls
        props={[
            ["vertical", "toggle"],
            ["b", "toggle"]
        ]}
    />
</Block>

<style>
    .container {
        height: 500px;
        width: 100%;
        user-select: none;
    }

    .content {
        box-sizing: border-box;
        outline: solid red 1px;
        min-width: 500px;
        width: 80%;
        height: 80%;
    }
</style>

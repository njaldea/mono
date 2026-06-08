<script lang="ts">
    import { Block, Instance } from "$lib";
    import Split3 from "$lib/layout/Split3.svelte";

    import Content from "./Content.svelte";

    let side_a_width = $state(300);
    let side_c_width = $state(300);
</script>

<Block>
    <Instance defaults={{}}>
        {#snippet children()}
            <div class="container">
                <Split3 bind:side_a_width bind:side_c_width>
                    {#snippet side_a()}
                        <div class="content">
                            <Content name="A"/>
                        </div>
                    {/snippet}
                    {#snippet side_b()}
                        <div class="content">
                            <Content name="B"/>
                        </div>
                    {/snippet}
                    {#snippet side_c()}
                        <div class="content">
                            <Content name="C"/>
                        </div>
                    {/snippet}
                </Split3>
            </div>
        {/snippet}
    </Instance>
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
        width: 100%;
        height: 100%;
    }
</style>

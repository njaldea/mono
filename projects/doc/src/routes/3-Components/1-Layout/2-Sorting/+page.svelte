<script lang="ts">
    import { Layout, sorter, Block, Instance, Controls } from "$lib";

    import MD from "./MD.svx";

    const routes = ["/02-zephyr", "/banana", "/apple", "/1-random"];
    let current = $state(routes[0]) as string | undefined;
</script>

<MD></MD>

<Block>
    <Instance defaults={{ override: false }}>
        {#snippet children({ values: { override } })}
            <div class="layout">
                <Layout
                    data={routes}
                    {current}
                    onnavigate={(e) => (current = e.detail)}
                    sorter={override ? sorter : undefined}
                >
                    {#snippet title()}
                        <div>Sorting</div>
                    {/snippet}
                    <div class="content">
                        <p>Current: {current}</p>
                        <p>Using {override ? "custom" : "default"} sorter</p>
                    </div>
                </Layout>
            </div>
        {/snippet}
    </Instance>
    <Controls props={[["override", "toggle"]]} />
</Block>

<style>
    .layout {
        height: 500px;
    }

    .content {
        width: 100%;
        height: 100%;
        padding: 10px;
        outline: solid white 1px;
        box-sizing: border-box;
    }
</style>

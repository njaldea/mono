<script lang="ts">
    import { Layout, renamer, Block, Instance, Controls } from "$lib";

    import MD from "./MD.svx";

    const routes = [ "/02-zephyr", "/banana", "/apple", "/1-random" ];
    let current = $state(routes[0]);
</script>

<MD></MD>

<Block>
    <Instance defaults={{ override_renamer: false }} >
        {#snippet children({ values: { override_renamer } })}
            <div class="layout">
                <Layout
                    data={routes}
                    {current}
                    onnavigate={e => current = e.detail}
                    renamer={override_renamer ? renamer : undefined}
                >
                    {#snippet title()}
                        <div>Renaming</div>
                    {/snippet}
                    <div class="content">
                        <p>Current: {current}</p>
                        <p>Using {override_renamer ? "custom" : "default"} renamer</p>
                    </div>
                </Layout>
            </div>
        {/snippet}
    </Instance>
    <Controls
        props={[[ "override_renamer", "toggle" ]]}
    />
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

<script lang="ts">
    import { Layout, Block, Instance } from "$lib";

    import MD from "./MD.svx";

    const routes = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current = $state(routes[0]);
</script>

<MD></MD>

<!-- example is using Layout but displayed as DocLayout           -->
<!-- intentionally done this way because I can't call build herer -->
<Block>
    <Instance noreset>
        {#snippet children()}
            <div class="layout">
                <Layout
                    data={routes}
                    current={current}
                    onnavigate={e => current = e.detail}
                >
                    {#snippet title()}
                        <div>DocLayout Component</div>
                    {/snippet}
                    <div class="content">content {current}</div>
                </Layout>
            </div>
        {/snippet}
    </Instance>
</Block>

<style>
    .layout {
        height: 500px;
    }

    .content {
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<script lang="ts">
    import { Layout, Block, Instance } from "$lib";

    import MD from "./MD.svx";

    const routes = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current = $state(routes[0]);
</script>

<MD></MD>

<Block>
    <Instance noreset>
        <div class="layout">
            <Layout data={routes} {current} onnavigate={(e) => (current = e.detail)}>
                {#snippet title()}
                    <div style="outline: red solid 1px;">Layout Component - title</div>
                {/snippet}
                <div class="content">content {current}</div>
            </Layout>
        </div>
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
        outline: solid white 1px;
        box-sizing: border-box;
    }
</style>

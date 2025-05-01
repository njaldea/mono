<script lang="ts">
    import { Layout, Block, Instance, Icon, Theme } from "$lib";

    import MD from "./MD.svx";

    const routes = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current = $state(routes[0]);

    let dark = $state(true);
</script>

<MD></MD>

<Block>
    <Instance noreset>
        <div class="layout">
            <Layout
                data={routes}
                theme={dark ? "dark" : "light"}
                current={current}
                onnavigate={e => current = e.detail}
            >
                {#snippet title()}
                    <div>Layout Component - title-misc</div>
                {/snippet}
                {#snippet title_misc()}
                    <div style="outline: solid 1px red; text-align: center;">A</div>
                    <Icon onclick={() => dark = !dark}><Theme {dark} /></Icon>
                    <div style="outline: solid 1px red; text-align: center;">B</div>
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

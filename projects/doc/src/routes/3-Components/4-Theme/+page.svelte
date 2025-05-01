<script lang="ts">
    import { Layout, Block, Instance, Controls, type PropType, type Unionized } from "$lib";

    import MD from "./MD.svx";

    const data = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current = $state(data[0]);

    const defaults = {
        layoutTheme: undefined,
        blockTheme: undefined
    } as const;

    const innerControls = [
        ["range1", "range", 0, 10, 0.001] as Unionized<PropType<"range">>,
        ["range2", "range", 0, 10, 0.001] as Unionized<PropType<"range">>
    ];

    const outerControls = [
        ["layoutTheme", "select", ["light", "dark"]] as Unionized<PropType<"select">>,
        ["blockTheme", "select", ["light", "dark"]] as Unionized<PropType<"select">>
    ];
</script>

<MD></MD>

<Block>
    <Instance {defaults} noreset>
        {#snippet children({ values: { layoutTheme, blockTheme } })}
            <div class="layout">
                <Layout
                    {data}
                    {current}
                    onnavigate={(e) => (current = e.detail)}
                    theme={layoutTheme}
                >
                    {#snippet title()}
                        <div>title</div>
                    {/snippet}
                    <div class="content" class:dark={layoutTheme !== "light"}>
                        <Block>
                            <Instance defaults={{ range1: 0, range2: 10 }} noreset>
                                {#snippet children({ values })}
                                    {current}
                                    <br />
                                    {JSON.stringify(values)}
                                {/snippet}
                            </Instance>
                            <Controls props={innerControls} />
                        </Block>
                    </div>
                </Layout>
            </div>
        {/snippet}
    </Instance>
    <Controls props={outerControls} />
</Block>

<style>
    .layout {
        height: 300px;
    }

    .content {
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
</style>

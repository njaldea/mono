<script lang="ts">
    import { Layout, Block, Instance, Controls } from "$lib";

    import MD from "./MD.svx";

    const symbols = ["A.B[C]", "A.B[D]", "A.E[F]", "X.K[L]"];

    const r = /^(.)\.(.)\[(.)\]$/;

    const parser = (value: string): string[] => {
        return value.match(r)?.slice(1, 4) ?? [];
    };

    let current = $derived(symbols[0]);
</script>

<MD></MD>

<Block>
    <Instance defaults={{ override_parser: false }}>
        {#snippet children({ values: { override_parser } })}
            <div class="layout">
                <Layout
                    data={symbols}
                    {current}
                    onnavigate={({detail}) => {
                        if (detail != null) {
                            current = detail;
                        }
                    }}
                    parser={override_parser ? parser : undefined}
                >
                    {#snippet title()}
                        <div>Parsing</div>
                    {/snippet}
                    <div class="content">
                        <p>Current (route): {current}</p>
                        <p>Using {override_parser ? "custom" : "default"} parser</p>
                    </div>
                </Layout>
            </div>
        {/snippet}
    </Instance>
    <Controls props={[["override_parser", "toggle"]]} />
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

<script lang="ts">
    import { Block, Instance, Controls } from "$lib";
    import Container from "$lib/components/layout/Container.svelte";

    import MD from "./MD.svx";

    import Content from "./Content.svelte";
</script>

<MD></MD>

<Block>
    <Instance defaults={{ vertical: false, b: false }} >
        {#snippet children({ values: { vertical, b } })}
            <div class="container">
                <Container offset={200} {vertical} {b}>
                    {#snippet side_a()}
                        <div class="content">
                            <Content {vertical} name="A" b={b} />
                        </div>
                    {/snippet}
                    {#snippet side_b()}
                        <div class="content">
                            <Content {vertical} name="B" b={!b} />
                        </div>
                    {/snippet}
                </Container>
            </div>
        {/snippet}
    </Instance>
    <Controls
        props={[
            [ "vertical", "toggle" ],
            [ "b", "toggle" ]
        ]}
    />
</Block>

<style>
    .container {
        height: 500px;
        user-select: none;
    }

    .content {
        box-sizing: border-box;
        padding: 10px;
        min-width: 500px;
    }
</style>

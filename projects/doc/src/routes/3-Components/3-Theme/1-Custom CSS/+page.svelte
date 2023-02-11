<script lang="ts">
    import { Layout, Block, Instance, Controls } from "$lib";
    import type { Prop } from "$lib";

    const data = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current = data[0];

    const defaults = {
        "--nil-doc-color-scheme": "dark",
        "--nil-doc-color": "hsl(0, 0%, 80%)",
        "--nil-doc-bg-color": "hsl(210, 6%, 7%)",
        "--nil-doc-content-outline-color": "hsla(0, 0%, 100%, 0.3))",
        "--nil-doc-block-bg-color": "hsla(200, 4%, 7%, 0.3)",
        "--nil-doc-block-outline-color": "hsla(0, 0%, 1000%, 0.3)",
        "--nil-doc-container-p": "hsl(0, 2%, 40%)",
        "--nil-doc-container-s": "hsl(0, 0%, 100%)",
        "--nil-doc-controls-p": "hsl(213, 26%, 7%)",
        "--nil-doc-controls-s": "hsl(213, 26%, 11%)",
        "--nil-doc-controls-hover": "hsl(203, 100%, 15%)"
    };

    const innerControls: Prop[] = [
        ["range1", "range", 0, 10, 0.001],
        ["range2", "range", 0, 10, 0.001]
    ];

    const outerControls: Prop[] = [
        ["--nil-doc-color-scheme", "select", ["dark", "light"]],
        ["--nil-doc-color", "color"],
        ["--nil-doc-bg-color", "color"],
        ["--nil-doc-content-outline-color", "color"],
        ["--nil-doc-block-bg-color", "color"],
        ["--nil-doc-block-outline-color", "color"],
        ["--nil-doc-container-p", "color"],
        ["--nil-doc-container-s", "color"],
        ["--nil-doc-controls-p", "color"],
        ["--nil-doc-controls-s", "color"],
        ["--nil-doc-controls-hover", "color"]
    ];

    let theme: "dark" | "light" = "dark";
</script>

<h1>Custom CSS Properties</h1>

<p>Currently a work in progress. hsla is not supported by input[color].</p>

<Block>
    <Instance {defaults} let:props noreset>
        <pre>{JSON.stringify(props, null, 4)}</pre>
        <div class="layout">
            <Layout
                {data}
                {current}
                bind:theme
                on:navigate={(e) => (current = e.detail)}
                --nil-doc-content-outline-color={props["--nil-doc-content-outline-color"]}
                --nil-doc-color={props["--nil-doc-color"]}
                --nil-doc-color-scheme={props["--nil-doc-color-scheme"]}
                --nil-doc-bg-color={props["--nil-doc-bg-color"]}
                --nil-doc-block-bg-color={props["--nil-doc-block-bg-color"]}
                --nil-doc-block-outline-color={props["--nil-doc-block-outline-color"]}
                --nil-doc-container-p={props["--nil-doc-container-p"]}
                --nil-doc-container-s={props["--nil-doc-container-s"]}
                --nil-doc-controls-p={props["--nil-doc-controls-p"]}
                --nil-doc-controls-s={props["--nil-doc-controls-s"]}
                --nil-doc-controls-hover={props["--nil-doc-controls-hover"]}
            >
                <div slot="title">Custom CSS</div>
                <div class="content">
                    <Block>
                        <Instance defaults={{ range1: 0, range2: 10 }} let:props noreset>
                            {current}
                            <br />
                            {JSON.stringify(props)}
                        </Instance>
                        <Controls props={innerControls} />
                    </Block>
                </div>
            </Layout>
        </div>
    </Instance>
    <Controls props={outerControls} />
</Block>

<style>
    .layout {
        height: 400px;
    }

    .content {
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
</style>

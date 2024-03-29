<script lang="ts">
    import { Layout, Block, Instance, Controls } from "$lib";
    import type { Prop } from "$lib";

    const data = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current = data[0];

    const defaults = {
        "--nil-doc-font-family": "",
        "--nil-doc-color-scheme": "dark",
        "--nil-doc-color": "hsl(0, 0%, 80%)",
        "--nil-doc-bg-color": "hsl(210, 6%, 7%)",
        "--nil-doc-content-outline-color": "hsla(0, 0%, 100%, 0.3)",
        "--nil-doc-block-bg-color": "hsla(200, 4%, 7%, 0.3)",
        "--nil-doc-block-outline-color": "hsla(0, 0%, 100%, 0.3)",
        "--nil-doc-container-p": "hsl(0, 2%, 40%)",
        "--nil-doc-container-s": "hsl(0, 0%, 100%)",
        "--nil-doc-controls-p": "hsl(213, 26%, 7%)",
        "--nil-doc-controls-s": "hsl(213, 26%, 11%)",
        "--nil-doc-controls-hover": "hsl(203, 100%, 15%)",
        "--nil-doc-nav-hovered": "hsla(203, 98, 50%, 0.1)",
        "--nil-doc-nav-page-hovered": "hsla(203, 98, 50%, 0.5)",
        "--nil-doc-nav-selected": "hsla(203, 98, 50%, 0.85)"
    };

    const controls: Prop[] = [
        ["--nil-doc-font-family", "text"],
        ["--nil-doc-color-scheme", "select", ["dark", "light"]],
        ["--nil-doc-color", "color", "hsl"],
        ["--nil-doc-bg-color", "color", "hsl"],
        ["--nil-doc-content-outline-color", "color", "hsla"],
        ["--nil-doc-block-bg-color", "color", "hsla"],
        ["--nil-doc-block-outline-color", "color", "hsla"],
        ["--nil-doc-container-p", "color", "hsl"],
        ["--nil-doc-container-s", "color", "hsl"],
        ["--nil-doc-controls-p", "color", "hsl"],
        ["--nil-doc-controls-s", "color", "hsl"],
        ["--nil-doc-controls-hover", "color", "hsl"],
        ["--nil-doc-nav-hovered", "color", "hsla"],
        ["--nil-doc-nav-page-hovered", "color", "hsla"],
        ["--nil-doc-nav-selected", "color", "hsla"]
    ];

    let theme: "dark" | "light" = "dark";

    // eslint-disable-next-line
    const spread = (props: unknown): string => {
        return [...Object.entries(props as Record<string, string>)]
            .map(([k, v]) => `${k}: ${v};`)
            .join("\n");
    };

    const navigate = (e: CustomEvent<string>) => {
        current = e.detail;
    };
</script>

<h1>Custom CSS Properties</h1>

<p>Currently a work in progress. hsla is not supported by input[color].</p>

<Block>
    <Instance {defaults} let:props noreset>
        <pre>{JSON.stringify(props, null, 4)}</pre>
        <div class="layout" style={spread(props)}>
            <Layout {data} {current} bind:theme on:navigate={navigate}>
                <div slot="title">Custom CSS</div>
                <div class="content">
                    <Block>
                        <Instance defaults={{ range1: 0, color1: "#ff0000ff" }} let:props noreset>
                            {current}
                            <br />
                            {JSON.stringify(props)}
                        </Instance>
                        <Controls
                            props={[
                                ["range1", "range", 0, 10, 0.001],
                                ["color1", "color", "hsla"]
                            ]}
                        />
                    </Block>
                </div>
            </Layout>
        </div>
    </Instance>
    <Controls props={controls} />
</Block>

<style>
    .content {
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
</style>

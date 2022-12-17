<script lang="ts">
    import { Layout, Block, Template, Params, Controls } from "$lib";

    const data = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current = data[0];

    const defaults = {
        layout_theme: undefined,
        block_theme: undefined
    };
</script>

# Light / Dark Theme

Light and Dark Theme is supported and configurable on the Root Components.

Root Components are:
- [Layout](/3-Components/1-Layout)
- [Block](/3-Components/2-Block)

```svelte
<script lang="ts">
    const data = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current = data[0];

    let layout_theme = undefined; // "light" | "dark" | undefined
    let block_theme = undefined;  // "light" | "dark" | undefined
</script>

<Layout
    {data}
    {current}
    on:navigate={e => current = e.detail}
    theme={layout_theme}
>
    <div slot="title">title</div>
    <div class="content">
        <Block theme={block_theme}>
            <Template {defaults} let:props>
                {current}
            </Template>
        <Params/>
        </Block>
    </div>
</Layout>
```

<Block>
    <Template
        {defaults}
        let:props={{ layout_theme, block_theme}}
        noreset
    >
        <div class="layout">
            <Layout
                {data}
                {current}
                on:navigate={e => current = e.detail}
                theme={layout_theme}
            >
                <div slot="title">title</div>
                <div class="content" class:dark={layout_theme !== "light"}>
                    <Block theme={block_theme}>
                        <Template defaults={{ range1: 0, range2: 10 }} let:props>
                            {current}
                            <br/>
                            {JSON.stringify(props)}
                        </Template>
                        <Params/>
                        <Controls
                            expand
                            props={[
                                {
                                    name: "range1",
                                    type: "range",
                                    min: 0,
                                    max: 10,
                                    step: 0.001
                                },
                                {
                                    name: "range2",
                                    type: "range",
                                    min: 0,
                                    max: 10,
                                    step: 0.001
                                }
                            ]}
                        />
                    </Block>
                </div>
            </Layout>
        </div>
    </Template>
    <Params/>
    <Controls
        expand
        props={[
            {
                name: "layout_theme",
                type: "select",
                values: ["light", "dark"]
            },
            {
                name: "block_theme",
                type: "select",
                values: ["light", "dark"]
            }
        ]}
    />
</Block>

<style>
    .layout {
        height: 300px;
    }

    .content {
        height: 100%;
        padding: 10px;
        outline: solid black 1px;
        box-sizing: border-box;
    }

    .content.dark {
        outline: solid white 1px;
    }
</style>

<script lang="ts">
    import Block from "$lib/components/block/Block.svelte";
    import Params from "$lib/components/block/Params.svelte";
    import Template from "$lib/components/block/Template.svelte";
    import Controls from "$lib/components/block/Controls.svelte";
    import Layout from "$lib/components/Layout.svelte";
</script>

# Layout.svelte

Layout component comprises of two sections:
- navigation
- content

```svelte
<Layout
    data={["/group1", "/group2", "/group1/subgroup", "/group1/subgroup/group1"]}
    current={"/group1"}
    on:navigate={e => goto(e.detail)}
>
    <svelte:fragment slot="title"></svelte:fragment>
    <svelte:fragment slot="content"></svelte:fragment>
</Layout>
```

<Block>
    {@const routes = ["/group1", "/group2", "/group1/subgroup", "/group1/subgroup/group1"]}
    <Template defaults={{current: null}} let:props let:tag>
        <Layout
            data={{routes}}
            current={props.current}
            on:navigate={e => console.log(e.detail)}
        >
            <div slot="title">Layout.svelte</div>
            <div slot="content" class="content">{tag}</div>
        </Layout>
    </Template>

    <Params
        tag="set1"
        props={{ current: "/group1" }}/>
    <Controls props={[
        {
            type: "select",
            name: "current",
            values: routes
        }
    ]}/>
</Block>

<style>
    .content {
        width: 100%;
        height: 100%;
        outline: solid white 1px;
    }
</style>
<script lang="ts">
    import { Layout } from "$lib";

    const routes_demo1 = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current_demo1 = routes_demo1[0];

    const routes_demo2 = ["/2-zephyr", "/banana", "/apple", "/1-random"];
    let current_demo2 = routes_demo2[0];
</script>

# Layout component

Layout component comprises of two sections:
- navigation
- content

```svelte
<Layout
    data={["/group1", "/group2", "/group1/subgroup/group1"]}
    current={"/group1"}
    on:navigate={e => goto(e.detail)}
>
    <div slot="title">title</div>
    <div slot="content">content</div>
</Layout>
```

<div class="demo">
    <Layout
        data={routes_demo1}
        current={current_demo1}
        on:navigate={e => current_demo1 = e.detail }
    >
        <div slot="title">title</div>
        <div slot="content" class="content">content {current_demo1}</div>
    </Layout>
</div>

## Ordering

Since we are using directory-like structure for navigation, there is a need to be able to control the order of items to be listed in the tree.

This is done by prefixing the "directory" with `number-`.

Any path with this format will be taken in higher priority over non-numbered paths.

The `number` will be used for ordering the paths.

```svelte
<Layout
    data={["/2-zephyr", "/apple", "/1-random"]}
    current={"/2-zephyr"}
    on:navigate={e => goto(e.detail)}
>
    <div slot="title">title</div>
    <div slot="content">content</div>
</Layout>
```

<div class="demo">
    <Layout
        data={routes_demo2}
        current={current_demo2}
        on:navigate={e => current_demo2 = e.detail }
    >
        <div slot="title">title</div>
        <div slot="content" class="content">content {current_demo2}</div>
    </Layout>
</div>

<style>
    .demo{
        height: 500px;
    }

    .content {
        width: 100%;
        height: 100%;
        padding: 10px;
        outline: solid white 1px;
    }
</style>
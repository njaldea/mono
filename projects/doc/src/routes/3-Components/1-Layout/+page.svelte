<script lang="ts">
    import { Layout } from "$lib";

    const routes = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current = routes[0];
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

---

<div class="demo">
    <Layout
        data={routes}
        current={current}
        on:navigate={e => current = e.detail }
    >
        <div slot="title">title</div>
        <div slot="content" class="content">content {current}</div>
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
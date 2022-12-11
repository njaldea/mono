<script lang="ts">
    import { Layout, renamer, sorter } from "$lib";

    const routes_demo1 = ["/group1", "/group2", "/group1/subgroup/group1"];
    let current_demo1 = routes_demo1[0];

    const routes_demo2 = ["/02-zephyr", "/banana", "/apple", "/1-random"];
    let current_demo2 = routes_demo2[0];
</script>

# Layout component

Layout component comprises of two sections:
- navigation
- content

```svelte
<Layout
    data={[ "/group1", "/group2", "/group1/subgroup/group1" ]}
    current={"/group1"}
    on:navigate={e => goto(e.detail)}
>
    <div slot="title">title</div>
    <div slot="content">content</div>
</Layout>
```

<div class="layout">
    <Layout
        data={routes_demo1}
        current={current_demo1}
        on:navigate={e => current_demo1 = e.detail}
    >
        <div slot="title">title</div>
        <div slot="content" class="content">content {current_demo1}</div>
    </Layout>
</div>

## Collapsing

Double clicking on the vertical divider will collapse the left side panel.

## Ordering and Renaming

Since we are using directory-like structure for navigation, there is a need to be able to control the order of items to be listed in the tree and how it will be presented to the tree.

`renamer` prop is a callback used to override the name "displayed" in the tree.

`sorter` props is the callback used to override how to order the directories in the tree.

```svelte
<Layout
    data={[ "/02-zephyr", "/banana", "/apple", "/1-random" ]}
    current={"/02-zephyr"}
    on:navigate={e => goto(e.detail)}
>
    <div slot="title">title</div>
    <div slot="content">content</div>
</Layout>
```

<div class="layout">
    <Layout
        data={routes_demo2}
        current={current_demo2}
        on:navigate={e => current_demo2 = e.detail}
    >
        <div slot="title">title</div>
        <div slot="content" class="content">
            Current: {current_demo2}
        </div>
    </Layout>
</div>

<br/>

For ease of use, `@nil-/doc` provides `renamer` and `sorter` methods where:
- if the directory matches `/(\d+)-(.+)/` `<number>-<text>`
  - the number prefix is used for ordering
  - the directory is renamed and simply displays the text after `-`
- else follow default string ordering

```svelte
<script lang="ts">
    import { sorter, renamer } from "$nil-/doc";
</script>

<Layout
    data={[ "/02-zephyr", "/banana", "/apple", "/1-random" ]}
    current={"/02-zephyr"}
    on:navigate={e => goto(e.detail)}
    sorter={sorter}
    renamer={renamer}
>
    <div slot="title">title</div>
    <div slot="content">content</div>
</Layout>
```

<div class="layout">
    <Layout
        data={routes_demo2}
        current={current_demo2}
        on:navigate={e => current_demo2 = e.detail}
        {sorter}
        {renamer}
    >
        <div slot="title">title</div>
        <div slot="content" class="content">
            Current: {current_demo2}
        </div>
    </Layout>
</div>

<style>
    .layout {
        height: 500px;
    }

    .content {
        width: 100%;
        height: 100%;
        padding: 10px;
        outline: solid white 1px;
    }
</style>

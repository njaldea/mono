# Requirements

1. Sveltekit
2. +layout.svelte

---

### Sveltekit

As this project is intended for sveltekit users, using svelte and its router is the easiest path forward.

Sveltekit's routes will be used to generate pages for the documentation.

---

### +layout.svelte

`@nil-/doc` provides a reusable [`Layout`](/3-Components/1-Layout) component for ease of use.

```svelte
<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { Layout, load, renamer, sorter } from "@nil-/doc";
</script>

<Layout
    data={load(import.meta.glob("./**/+page.svelte", { eager: true }))}
    current={$page.route.id}
    {renamer}
    {sorter}
    on:navigate={(e) => goto(e.detail)}
>
    <svelte:fragment slot="title">@nil-/doc</svelte:fragment>
    <svelte:fragment slot="content">
        <slot />
    </svelte:fragment>
</Layout>
```

### load

The provided `load` method is a method intended for ease of use to populate all the routes in the project.

The snippet above uses `import.meta.glob` which is provided by vite.

### renamer, sorter

By default, the tree created from the list of routes passed as data follows the regular string ordering.

Because of this, there is a need to override the ordering logic and the text displayed in the tree.

See [Layout Component](/3-Components/1-Layout) for more details.
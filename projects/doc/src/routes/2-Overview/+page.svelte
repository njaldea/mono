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
    on:navigate={(e) => goto(e.detail)}
    {renamer}
    {sorter}
>
    <svelte:fragment slot="title">@nil-/doc</svelte:fragment>
    <svelte:fragment slot="content">
        <slot />
    </svelte:fragment>
</Layout>
```

---

### load

The provided `load` method is a method intended for ease of use to populate all the routes in the project.

The snippet above uses `import.meta.glob` which is provided by vite.

Does the following:
- removes the root route. this is currently not handled
- removes routes that has parameters in them via regex match (`/.*\[.*\].*/`)
- collapses routes that used advanced layout (`./sub/(layout)/+page.svelte` -> `./sub/+page.svelte`)

---

### renamer, sorter

By default, the tree created from the list of routes passed as data follows the regular string ordering.

Because of this, there is a need to override the ordering logic and the text displayed in the tree.

See [Layout Component](/3-Components/1-Layout) for more details.

---

### vite assets

@nil-/doc imports static assets in its components.

vite requires these assets to be added in `vite.config.js`

```javascript
{
    assetsInclude: ['**/*.css']
}
```

---

### using Layout in sub routes

If `+layout.svelte` is not in the root route, `$page.route.id` contains paths that will not match what `import.meta.glob` example.

Let's say `+layout.svelte` is at `src/routes/sub/folder/+layout.svelte`, `/sub/folder` is the prefix and route id + goto route needs to be reprocessed.

```svelte
<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { Layout, load, renamer, sorter } from "@nil-/doc";

    const prefix = "/sub/folder";
</script>

<Layout
    data={load(import.meta.glob("./**/+page.svelte", { eager: true }))}
    current={$page.route.id.substring(prefix.length)}
    on:navigate={(e) => goto(`${prefix}${e.detail}`)}
    {renamer}
    {sorter}
>
    <svelte:fragment slot="title">@nil-/doc</svelte:fragment>
    <svelte:fragment slot="content">
        <slot />
    </svelte:fragment>
</Layout>
```

---

### fallback page

add a page to capture the routes: `/.../[...rest]/+page.svelte`

```svelte
<script lang='ts'>
    import { goto } from "$app/navigation";
    goto("/1-Motivation");
</script>
```
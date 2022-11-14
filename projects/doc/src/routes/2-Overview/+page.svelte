<script lang='ts'>
    import Layout from "$lib/Layout.svelte";
</script>

<div class='markdown-body'>

# Requirements

1. Sveltekit
2. +layout.ts
3. +layout.svelte
4. +page.svelte

---

### Sveltekit

As this project is intended for svelte users, using svelte and its router is the easiest path forward.

Sveltekit's routes will be used to generate pages for the documentation.

---

### +layout.ts

`Sveltekit` uses this file for definition of a load function called once on page load.

The `loader` method will generate the pages necessary for filling up the table of contents in the side bar.

For more details, see `import.meta.glob` from `vite`'s documentation.

```javascript
import { loader } from "@nil-/doc";
const options = { eager: true };
export const load = loader(import.meta.glob("./**/+page.svelte", options));
```

---

### +layout.svelte

`Sveltekit` uses this file for page composition. `@nil-/doc` provides a reusable `Layout` component for ease of use.

```svelte
<script lang="ts">
    import { type Data, Layout } from "@nil-/doc";
    export let data: Data;
</script>

<Layout {data}>
    <svelte:fragment slot="content">
        <slot />
    </svelte:fragment>
</Layout>
```

---

### +page.svelte

`Sveltekit` uses `+page.svelte` as an indication of creating routes.

The `data` passed to the Layout component is populated through the `load` function, which is then used to create a filesystem-tree-like PerformanceObserverEntryList.

</div>

<style>
    div {
        padding: 10px;
    }
</style>

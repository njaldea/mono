<script lang="ts">
    import  { Layout } from "$lib";
</script>

# Requirements

1. Sveltekit
2. +layout.ts
3. +layout.svelte
4. +page.svelte

---

### Sveltekit

As this project is intended for sveltekit users, using svelte and its router is the easiest path forward.

Sveltekit's routes will be used to generate pages for the documentation.

---

### +layout.svelte

`Sveltekit` uses this file for page composition. `@nil-/doc` provides a reusable [`Layout`](/3-Components/1-Layout) component for ease of use.

```svelte
<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { load, Layout } from "@nil-/doc";
</script>

<Layout
    data={load(import.meta.glob("./**/+page.svelte", { eager: true }))}
    current={$page.route.id}
    on:navigate={(e) => goto(e.detail)}
>
    <svelte:fragment slot="title">@nil-/doc</svelte:fragment>
    <svelte:fragment slot="content">
        <slot />
    </svelte:fragment>
</Layout>
```

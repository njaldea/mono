# Overview

All svelte components coming from this library are framework agnostic (does not require SvelteKit).

`+layout.svelte` serves as the glue layer between the library and the user.

---

### Installation

> pnpm install -D @nil-/doc

---

### +layout.svelte

`@nil-/doc` provides a reusable [`Layout`](/3-Components/1-Layout) component for ease of use.

```svelte
<script lang="ts">
    import {
        Layout,     // reusable component. will provide the navigation that lists all routes provided
        sorter,     // See `sorter` section below
        renamer     // See `renamer` section below
    } from "@nil-/doc";

    import { sveltekit } from "@nil-/doc/sveltekit";

    const {
        data,       // list of routes
        current,    // a store that specifies the current route
                    // similar to `page.route.id` but already post processed
                    // when there is a prefix
        navigate    // callback to change current page
    } = sveltekit(import.meta.glob("./**/+page.svelte", { eager: true }));
</script>

<Layout
    {data}
    current={$current}
    on:navigate={navigate}
    {renamer}
    {sorter}
>
    <svelte:fragment slot="title">@nil-/doc</svelte:fragment>
    <slot />
</Layout>
```

---

### sveltekit

For ease of use, @nil-/doc provides a method mainly for sveltekit use.

Expected arguments:

| argument |          | purpose                                      |
| -------- | -------- | -------------------------------------------- |
| detail   |          | returned information from `import.meta.glob` |
| prefix   | optional | use when layout is not in the root directory |

Currently returns an object with the following properties:

| property | purpose                                                                       |
| -------- | ----------------------------------------------------------------------------- |
| data     | an array of string representing each routes                                   |
| current  |  a store representing the current route post processed to remove group layout |
| navigate | a callback responsible in changing the page                                   |

---

### renamer, sorter

By default, the tree created from the list of routes passed as data follows the regular string ordering.

Because of this, there is a need to override the ordering logic and the text displayed in the tree.

See [Layout Component](/3-Components/1-Layout) for more details.

---

### styling

The components in this library tries to not do the following:
- add any global styling
- add any styling that might affect user styles

Any css resets might affect the component library so beware.
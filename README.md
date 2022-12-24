# Nil's monorepo

This repo will be my sandbox to try different tools and libraries for my own learning experience.
Packages will be published to npmjs with `@nil-` scope.

Details listed in this README are things I applied to this monorepo and probably in some of its workspaces.

---

## Workspaces

-   [projects/doc](./projects/doc/README.md)
-   [projects/3d](./projects/3d/README.md)

---

Currently uses:

-   pnpm
-   turborepo
-   changeset

---

## Scripts

| command                | purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| pnpm build             | build all "servers"                                              |
| pnpm package           | generate publishable packages                                    |
| pnpm clean             | remove all generated files                                       |
| pnpm dev:3d            | spawn @nil-/3d web server                                        |
| pnpm dev:doc           | spawn @nil-/doc web server                                       |
| pnpm dev:gate          | spawn @nil-/gate web server                                      |
| pnpm format            | apply prettier for the whole repo                                |
| pnpm check             | check svelte-check for all workspaces                            |
| pnpm lint              | check prettier and eslint                                        |
| pnpm graph `<command>` | generate `graphs/<command>.png` for script dependency graph      |
| pnpm commit:vercel     | commit staged files with a message to force deployment in vercel |

---

## Workflow

-   push changes to remote
-   github action `.github/workflows/publish.yml` will create MR for version bump if necessary
-   merge version bump MR when ready for release
-   Vercel should deploy only when there is a new release

---

## Fallback Page

There are multiple ways to do this but the easiest for me is to simply add a page to capture the routes: `/.../[...rest]/+page.ts`

```typescript
import { redirect } from "@sveltejs/kit";
export const load = () => {
    throw redirect(303, "/1-Motivation");
};
```

A better approach would probably be to use sveltekit's [hooks](https://kit.svelte.dev/docs/hooks).

---

## Peer Workspace Dependency

Depending on peer workspace is done by the following:

-   `"@nil-/doc": "workspace:^"`
-   package.json contains:

```json
{
    "publishConfig": {
        "directory": "package",
        "linkDirectory": true
    }
}
```

---

## Peer Dependencies

Some of the library projects has peerDependencies that are also necessary for documentation.

Due to this, i have added the following configuration to `.npmrc`

```
auto-install-peers=true
strict-peer-dependencies=true
```

As a side effect, `pnpm update -r` does not automatically update those packages, but instead creates another entries for `dependencies`.

For now, removing these dependencies would be a manual task until I find a better appraoch.

---

## mdsvex

For documentation, I am using mdsvex to be able to write the pages in markdown and write any interactive portion in svelte.

`svelte-check` fails when seeing markdown inside svelte file.

Because of this, the following setup is done for mdsvex and svelte-check.

-   Only allow markdown syntax in `+page.svelte` files.
    -   this is configured through preprocessor in `svelte.config.js`

```js
mdsvex({ extensions: ["+page.svelte"] });
```

-   all checks in +page.svelte files are disabled.
    -   this is configured in each `tsconfig.json`

```json
{
    "exclude": ["./src/routes/**/+page.svelte"]
}
```

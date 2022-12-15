# Nil's monorepo

This repo will be my sandbox to try different tools and libraries for my own learning experience.
Packages will be published to npmjs with `@nil-` scope.

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

## Peer workspace dependency

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

## Peer Dependencies

Some of the library projects has peerDependencies that are also necessary for documentation.

Due to this, i have added the following configuration to `.npmrc`

```
auto-install-peers=true
strict-peer-dependencies=true
```

As a side effect, `pnpm update -r` does not automatically update those packages, but instead creates another entries for `dependencies`.
For now, removing these dependencies would be a manual task until I find a better appraoch.

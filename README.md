# Mono repo trial

This repo is to serve as template for creating monorepo.

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

| command                | purpose                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| pnpm build             | build all "servers"                                                |
| pnpm package           | generate publishable packages                                      |
| pnpm clean             | remove all generated files                                         |
| pnpm dev:3d            | spawn @nil-/3d web server                                          |
| pnpm dev:doc           | spawn @nil-/doc web server                                         |
| pnpm format            | apply prettier for the whole repo                                  |
| pnpm check             | check svelte-check for all workspaces                              |
| pnpm lint              | check prettier and eslint                                          |
| pnpm graph `<command>` | generate `graphs/<command>.png` for script dependency graph        |
| pnpm changeset         | to generate changeset files                                        |
| pnpm changeset version | (used by CI) to resolve all changesets                             |
| ./scripts/vercel       | (used by CI) to be used to know if vercel needs to deploy a commit |

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

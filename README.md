# Mono repo trial

This repo is to serve as a template for creating monorepo with reusable component libraries

---

Use pnpm and its workspaces

> pnpm install <br/>
> pnpm build <br/>
> pnpm format <br/>
> pnpm lint <br/>
> pnpm check <br/>
> pnpm clean <br/>

---

Depending on peer workspace is done via relative path:

- `"@nil-/doc": "workspace:../doc/package"`

This is done to be able to depend on builded/packaged workspace.
Before publishing, this should be "resolved" with the same semantic version as the current workspace.

TODO: investigate publish step. maybe [changesets](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md).

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

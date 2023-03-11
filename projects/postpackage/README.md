# @nil-/postpackage

This is for personal use to postprocess the package.json before publishing to remove the following:

-   publishConfig
-   devDependencies
-   scripts

Also copies LICENSE and README.md to target destination

### How to use

```
npx @nil-/postpackage <destination>
```

# @nil-/rebundler

This is for personal use to simplify rebundling of local/independent js/ts scripts.
Very opinionated and implemented for personal use.

Currently supports:

-   iife / cjs / es
    -   uses `rollup` to bundle a js file
-   json
    -   uses ts `ts-json-schema-generator` to generate json schema

to execute

```
npx @nil-/rebundler COMMAND PATH [...OPTIONS]
```

PATH = input directory where the file(s) to process are located

| SHORT | LONG     | COMMAND         | PURPOSE                                                    |
| ----- | -------- | --------------- | ---------------------------------------------------------- |
| -o    | --out    | all             | destination folder                                         |
| -f    | --file   | all             | target input file. will be used for export name for `iife` |
| -p    | --plugin | iife / cjs / es | enable plugin. currently only supports "terser"            |

If file is provided for `json`, all ts files will be bundled into one monolithic json schema.
If not, each ts file in the input path will have a json schema of their own.
Any sibling imports will be referenced appropriately through `$ref`.

Also supports configuration through `nil.rebundler.config.js` in the input path.

Example of the configuration

```javascript
export default {
    in: ".",
    out: "./out",
    mode: {
        type: "iife",
        file: "index.js",
        plugins: ["terser"]
    }
};
```

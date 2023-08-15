# @nil-/jwalk

A library that **walks** through JSON data following schema provided. It is a play of words with "jaywalk" but for JSON.

A "jaywalker" is described as a pedestrian that violates the "rules".

In contrary, "jwalk" expects users to provide the "rules" to follow how to traverse the graph.

The only responsibility of `jwalk` is to execute the nodes by traversing the graph you setup yourself.

Anything you can do inside the `nodes` is up to your imagination.

### Example

```ts
import { jwalker } from "@nil-/jwalk";

const j = jwalker()
    .node("Boolean", "boolean", {
        action: (context, { value }) => {
            console.log("[BOOL] INIT", value);
            return {
                update: (value) => console.log("[BOOL] UPDATE", value),
                destroy: () => console.log("[BOOL] DESTROY")
            };
        }
    })
    .node("Number", "number", {
        action: (context, { value }) => {
            console.log("[Number] INIT", value);
            return {
                update: (value) => console.log("[Number] UPDATE", value),
                destroy: () => console.log("[Number] DESTROY")
            };
        }
    })
    .node("ROOT", "tuple", {
        content: ["Boolean", "Number"],
        action: (context, { value, auto }) => {
            console.log("[ROOT] INIT", value);
            const { update, destroy } = auto(
                () => context,
                () => {},
                value
            );
            return {
                update: (value) => {
                    console.log("[ROOT] UPDATE", value);
                    update(value);
                },
                destroy: () => {
                    destroy();
                    console.log("[ROOT] DESTROY");
                }
            };
        }
    })
    .build(null, [true, 100]);

j.update([false, 200]);

j.destroy();
```

#### Result

```
[GROUP]  INIT    [true, 100]
[BOOL]   INIT    true
[Number] INIT    100
[GROUP]  UPDATE  [false, 200]
[BOOL]   UPDATE  false
[Number] UPDATE  200
[Number] DESTROY
[BOOL]   DESTROY
[GROUP]  DESTROY
```

### Limitations

-   Currently, schema validation is expected to be done by the user before `build`/`update`.<br/>
    Some considerations is to add `zod` json validation before execution of each node.

For more information see [link](https://mono-jwalk.vercel.app)

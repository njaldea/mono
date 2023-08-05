<script lang="ts">
    import { tseditor } from "../tseditor";
    const detail = {
        libs: { "@nil-/jwalk": "https://unpkg.com/@nil-/jwalk@0.0.6" },
        code: `import { jwalker } from "@nil-/jwalk";

const j = jwalker<null>()
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
        value: ["Boolean", "Number"],
        action: (context, { value, auto }) => {
            console.log("[GROUP] INIT", value);
            const { update, destroy } = auto(() => context, () => {}, value);
            return {
                update: (value) => {
                    console.log("[GROUP] UPDATE", value);
                    update(value);
                },
                destroy: () => {
                    destroy();
                    console.log("[GROUP] DESTROY");
                }
            };
        }
    })
    .build(null, [ true, 100 ]);

j.update([ false, 200 ]);

j.destroy();
`
    };
</script>

<div class="outer">
    <div class="inner" use:tseditor={detail} />
</div>

<style>
    .outer {
        background-color: rgb(104, 100, 100);
        padding-block: 10px;
        width: 100%;
        height: 750px;
    }
    .inner {
        width: 100%;
        height: 100%;
    }
</style>

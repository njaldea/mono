<script lang="ts">
    import type { UpdateArg } from "../tseditor";
    import Sandbox from "../Sandbox.svelte";
    import { content } from "./view";

    let cc: UpdateArg = {
        importmap: {},
        module: ""
    };
    const update = (detail: UpdateArg) => (cc = detail);
</script>

<h1>Sandbox</h1>

<iframe title="view" srcdoc={content(cc)} frameBorder="0"></iframe>

<Sandbox
    {update}
    height={750}
    code={`import { jwalker, memoizer } from "@nil-/jwalk";

const actionify = <Value>(tag: string, value: Value) => {
    console.log(\`[\${tag}]\`, \`INIT\`, value);
    return {
        update: (value: Value) => console.log(\`[\${tag}]\`, \`UPDATE\`, value),
        destroy: () => console.log(\`[\${tag}]\`, \`DESTROY\`, "-")
    };
};

const j = jwalker()
// const j = jwalker({ memoizer })
    .node("Boolean", "boolean", { action: (context, { value }) => actionify("BOOL", value) })
    .node("Number", "number", { action: (context, { value }) => actionify("NUMBER", value) })
    .node("ROOT", "tuple", {
        value: ["Boolean", "Number"],
        action: (context, { value, auto }) => {
            console.log("[GROUP]", "INIT", value);
            const { update, destroy } = auto(() => context, () => {}, value);
            return {
                update: (value) => {
                    console.log("[GROUP]", "UPDATE", value);
                    update(value);
                },
                destroy: () => {
                    destroy();
                    console.log("[GROUP]", "DESTROY", "-");
                }
            };
        }
    })
    .build(null, [ true, 100 ]);

j.update([ false, 200 ]);

j.destroy();
`}
/>

<style>
    iframe {
        width: 100%;
        height: 250px;
        outline: 2px solid rgb(104, 100, 100);
    }
</style>

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

type ActionInstance<Value> = { update: (v: Value) => void; destroy: () => void; };

const actionize = <Value>(tag: string, value: Value) => {
    console.log(\`[\${tag}]\`, "INIT", \`\${value}\`);
    return {
        update: (value) => console.log(\`[\${tag}]\`, "UPDATE", \`\${value}\`),
        destroy: () => console.log(\`[\${tag}]\`, "DESTROY", "-")
    } as ActionInstance<Value>;
};

const automize = <Value>(tag: string, value: Value, impl: () => ActionInstance<Value>) => {
    console.log("ROOT", "INIT", \`\${value}\`);
    const i = impl();
    return {
        update: (value) => {
            console.log(\`[\${tag}]\`, "UPDATE", \`\${value}\`);
            i.update(value);
        },
        destroy: () => {
            i.destroy();
            console.log(\`[\${tag}]\`, "DESTROY", "-");
        }
    } as ActionInstance<Value>;
};

const j = jwalker()
// const j = jwalker({ memoizer })
    .node("Boolean", "boolean", { action: (_, { value }) => actionize("BOOL", value) })
    .node("Number", "number", { action: (_, { value }) => actionize("NUMBER", value) })
    .node("ROOT", "tuple", {
        content: ["Boolean", "Number"],
        action: (_, { value, auto }) => {
            return automize("ROOT", value, () => auto(() => _, () => {}, value));
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

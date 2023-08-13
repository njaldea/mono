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
type AutoT<Value> = (create: () => any, destroy: () => void, value: Value) => ActionInstance<Value>;

const actionize = <Value>(tag: string, value: Value) => {
    console.log(\`[\${tag}]\`, "INIT", \`\${value}\`);
    return {
        update: (value) => console.log(\`[\${tag}]\`, "UPDATE", \`\${value}\`),
        destroy: () => console.log(\`[\${tag}]\`, "DESTROY", "-")
    } as ActionInstance<Value>;
};

const automize = <Value, Auto extends AutoT<Value>>(tag: string, value: Value, auto: Auto) => {
    console.log(\`[\${tag}]\`, "INIT", \`\${value}\`);
    const { update, destroy } = auto(() => {}, () => {}, value);
    return {
        update: (value) => {
            console.log(\`[\${tag}]\`, "UPDATE", \`\${value}\`);
            update(value);
        },
        destroy: () => {
            destroy();
            console.log(\`[\${tag}]\`, "DESTROY", "-");
        }
    } as ActionInstance<Value>;
};

const j = jwalker()
// const j = jwalker({ memoizer })
    .node("Boolean", "boolean", { action: (_, { value }) => actionize("BOOL", value) })
    .node("Number", "number", { action: (_, { value }) => actionize("NUMBER", value) })
    .node("ROOT", "tuple", {
        value: ["Boolean", "Number"],
        action: (_, { value, auto }) => automize("ROOT", value, auto)
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

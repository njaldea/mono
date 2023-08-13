<script lang="ts">
    import type { UpdateArg } from "../../tseditor";
    import Sandbox from "../../Sandbox.svelte";
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

const actionize = <Value>(tag: string, path: string, value: Value, impl?: () => ActionInstance<Value>) => {
    const print = (mode: string, v: string) => console.log(tag, mode, path, v);
    print("INIT", JSON.stringify(value));
    const i = impl?.();
    return {
        update: (value) => {
            print("UPDATE", JSON.stringify(value));
            i?.update(value);
        },
        destroy: () => {
            i?.destroy();
            print("DESTROY", "-");
        }
    } as ActionInstance<Value>;
};

const j = jwalker<string>()
// const j = jwalker<string>({ memoizer })
    .node("Boolean", "boolean", { action: (_, { value }) => actionize("BOOL", _, value) })
    .node("Number", "number", { action: (_, { value }) => actionize("NUMBER", _, value) })
    .node("Item", "tuple", {
        content: ["Boolean", "Number"],
        action: (_, { value, auto }) =>
            actionize("ITEM", _, value, () => auto((k) => \`\${_}/\${k}\`, () => {}, value))
    })
    .node("ROOT", "list", {
        content: "Item",
        action: (_, { value, auto }) =>
            actionize("ROOT", "/", value, () => auto((k) => \`/\${k}\`, () => {}, value))
    })
    .build("", [[false, 200], [true, 100]]);
console.log("BUILD DONE");

j.update([[true, 100]]);
console.log("UPDATE DONE");

j.update([[false, 200], [true, 100]]);
console.log("UPDATE DONE");

j.destroy();
console.log("DESTROY DONE");
`}
/>

<style>
    iframe {
        width: 100%;
        height: 250px;
        outline: 2px solid rgb(104, 100, 100);
    }
</style>

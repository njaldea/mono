<script lang="ts">
    import type { UpdateArg } from "../../tseditor";
    import Sandbox from "../../Sandbox.svelte";

    const update = (detail: UpdateArg) => {
        if (iframe) {
            iframe.contentWindow?.postMessage({
                type: "module",
                id: "content",
                code: detail.module,
                map: detail.importmap
            });
        }
    };

    let iframe: HTMLIFrameElement;
    let h: number = 210;
</script>

<h1>Sandbox</h1>

<div bind:clientHeight={h}>
    <iframe bind:this={iframe} title="preview" src="/preview/log"></iframe>
    <Sandbox
        {update}
        height={`${Math.max(h - 275)}px`}
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
</div>

<style>
    div {
        width: 100%;
        height: calc(100% - 50px);
        max-height: 100%;
        overflow: hidden;
    }
    iframe {
        width: 100%;
        height: 250px;
        border: none;
        box-sizing: border-box;
        overflow: scroll;
    }
</style>

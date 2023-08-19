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
</script>

<h1>Sandbox</h1>

<iframe bind:this={iframe} title="preview" src="/preview/log"></iframe>
<div>
    <Sandbox
        {update}
        code={`import { jwalker, memoizer } from "@nil-/jwalk";

type ActionInstance<Value> = { update: (v: Value) => void; destroy: () => void; };

const actionize = <Value>(tag: string, path: string, value: Value, impl?: () => ActionInstance<Value>) => {
    const log = (mode: string, v: string) => console.log(tag, mode, path, v);
    log("INIT", JSON.stringify(value));
    const i = impl?.();
    return {
        update: (value) => {
            log("UPDATE", JSON.stringify(value));
            i?.update(value);
        },
        destroy: () => {
            i?.destroy();
            log("DESTROY", "-");
        }
    } as ActionInstance<Value>;
};

const j = jwalker<string>()
// const j = jwalker<string>({ memoizer })
    .node("Boolean", "boolean", { action: ({ context, value }) => actionize("BOOL", context, value) })
    .node("Number", "number", { action: ({ context, value }) => actionize("NUMBER", context, value) })
    .node("Item", "tuple", {
        content: ["Boolean", "Number"],
        action: ({ context, value, auto }) =>
            actionize("ITEM", context, value, () => auto((k) => \`\${context}/\${k}\`, () => {}, value))
    })
    .node("ROOT", "list", {
        content: "Item",
        action: ({ value, auto }) =>
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
        position: relative;
        min-height: 300px;
        padding-top: 5px;
        flex: 1;
    }
    iframe {
        width: 100%;
        height: 250px;
        border: none;
        box-sizing: border-box;
        overflow: scroll;
    }
</style>

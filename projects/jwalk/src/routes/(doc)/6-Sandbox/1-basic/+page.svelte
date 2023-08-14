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
    let h: number;
    let w: number;
</script>

<h1>Sandbox</h1>

<div bind:clientHeight={h} bind:clientWidth={w}>
    <iframe bind:this={iframe} title="preview" src="/preview/log"></iframe>
    <Sandbox
        {update}
        width={`${w}px; position: absolute;`}
        height={`${Math.max(h - 275, 0)}px`}
        code={`import { jwalker, memoizer } from "@nil-/jwalk";

type ActionInstance<Value> = { update: (v: Value) => void; destroy: () => void; };

const actionize = <Value>(tag: string, value: Value, impl?: () => ActionInstance<Value>) => {
    const print = (mode: string, v: string) => console.log(tag, mode, v);
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

const j = jwalker()
// const j = jwalker({ memoizer })
    .node("Boolean", "boolean", { action: (_, { value }) => actionize("BOOL", value) })
    .node("Number", "number", { action: (_, { value }) => actionize("NUMBER", value) })
    .node("ROOT", "tuple", {
        content: ["Boolean", "Number"],
        action: (_, { value, auto }) => 
            actionize("ROOT", value, () => auto(() => _, () => {}, value))
    })
    .build(null, [true, 100]);

j.update([false, 200]);

j.destroy();
`}
    />
</div>

<style>
    div {
        width: 100%;
        height: calc(100% - 50px);
        position: relative;
    }
    iframe {
        width: 100%;
        height: 250px;
        border: none;
        box-sizing: border-box;
        overflow: scroll;
    }
</style>

<script lang="ts">
    import type { UpdateArg } from "../../tseditor";
    import Sandbox from "../../Sandbox.svelte";
    import { onMount } from "svelte";
    import { html, reinit } from "./content";

    const update = (detail: UpdateArg) => {
        if (iframe) {
            iframe.contentWindow?.postMessage({
                type: "module",
                id: "content",
                code: reinit,
                map: {}
            });
            iframe.contentWindow?.postMessage({
                type: "module",
                id: "content",
                code: detail.module,
                map: detail.importmap
            });
        }
    };

    let iframe: HTMLIFrameElement;
    onMount(() => {
        window.addEventListener("message", (e) => {
            if (e.data.type === "init") {
                iframe?.contentWindow?.postMessage({
                    type: "module",
                    id: "content",
                    map: {},
                    code: html
                });
            }
        });
    });
</script>

<h1>ts/js</h1>

<iframe bind:this={iframe} title="preview" src="/preview/page" frameBorder="0"></iframe>

<hr />
<div>
    <Sandbox
        {update}
        code={`import { jwalker } from "@nil-/jwalk";

const btnToggle = document.getElementById("toggle") as HTMLButtonElement;
const inputV1 = document.getElementById("v1") as HTMLInputElement;
const inputV2 = document.getElementById("v2") as HTMLInputElement;
const inputV3 = document.getElementById("v3") as HTMLInputElement;
const inputV4 = document.getElementById("v4") as HTMLInputElement;
const op1 = document.getElementById("op1") as HTMLSpanElement;
const op2 = document.getElementById("op2") as HTMLSpanElement;

type Context = { out: (v: number) => void; };

const operation = (impl: (l: number, r: number) => number) => {
    return (args: { context: Context, value: readonly [number, number] }) => {
        args.context.out(impl(...args.value));
        return {
            update: (v: readonly [number, number] ) => args.context.out(impl(...v)),
            destroy: () => args.context.out(0)
        };
    };
};

const builder = jwalker<Context>()
    .node("+", "tuple", { content: ["number", "number"], action: operation((l, r) => l + r) })
    .node("-", "tuple", { content: ["number", "number"], action: operation((l, r) => l - r) });

const modes = [ ["+", "+"], ["+", "-"], ["-", "-"], ["-", "+"] ] as const;
let mode = 0;

const make = (ops: (typeof modes)[number]) => {
    [op1.innerHTML, op2.innerHTML] = ops;
    const b = builder.node("ROOT", "tuple", {
        content: ops,
        action: ({ context, value, auto, meta: { keys } }) => {
            const results = [0, 0];
            const e = (k: typeof keys, v: number) => {
                results[k] = v;
                context.out(results[0] * results[1]);
            };
            return auto(
                (key) => (v) => ({ out: e(key, v) }),
                (key) => e(key, 0),
                value
            );
        }
    });
    const data = () => {
        return [
            [+inputV1.value, +inputV2.value],
            [+inputV3.value, +inputV4.value]
        ] satisfies typeof b.types.ROOT;
    };
    const context: Context = { out: (value) => (btnToggle.innerHTML = \`\${value}\`) };
    return { ...b.build(context, data()), data };
};

let action = make(modes[mode]);
btnToggle.addEventListener("click", () => {
    mode = (mode + 1) % modes.length;
    action?.destroy();
    action = make(modes[mode]);
});

const update = () => action.update(action.data());
inputV1.addEventListener("change", update);
inputV2.addEventListener("change", update);
inputV3.addEventListener("change", update);
inputV4.addEventListener("change", update);
`}
    />
</div>

<style>
    div {
        width: 100%;
        height: calc(100% - 170px);
        position: relative;
    }

    iframe {
        width: 100%;
        height: 46px;
        border: none;
        box-sizing: border-box;
        overflow: scroll;
    }
</style>

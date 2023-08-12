<script lang="ts">
    import Sandbox from "../../Sandbox.svelte";
</script>

<Sandbox
    readonly
    height={840}
    code={`import { jwalker } from "@nil-/jwalk";

const btnToggle = document.getElementById("toggle") as HTMLButtonElement;
const inputV1 = document.getElementById("v1") as HTMLInputElement;
const inputV2 = document.getElementById("v2") as HTMLInputElement;
const inputV3 = document.getElementById("v3") as HTMLInputElement;
const inputV4 = document.getElementById("v4") as HTMLInputElement;
const op1 = document.getElementById("op1") as HTMLSpanElement;
const op2 = document.getElementById("op2") as HTMLSpanElement;

type Context = { eval: (v: number) => void };
const builder = jwalker<Context>()
    .node("+", "tuple", {
        value: ["number", "number"],
        action: (context, { value }) => {
            context.eval(value[0] + value[1]);
            return {
                update: (v) => context.eval(v[0] + v[1]),
                destroy: () => context.eval(0)
            };
        }
    })
    .node("-", "tuple", {
        value: ["number", "number"],
        action: (context, { value }) => {
            context.eval(value[0] - value[1]);
            return {
                update: (v) => context.eval(v[0] - v[1]),
                destroy: () => context.eval(0)
            };
        }
    });

const modes = [
    ["+", "+"],
    ["+", "-"],
    ["-", "-"],
    ["-", "+"]
] as const;
let mode = 0;

const make = <T extends { destroy: () => void }>(
    ops: (typeof modes)[number],
    current?: T
) => {
    [op1.innerHTML, op2.innerHTML] = ops;
    current?.destroy();
    const b = builder.node("ROOT", "tuple", {
        value: ops,
        action: (context, { value, auto, meta: { keys } }) => {
            const results = [0, 0];
            const e = (k: typeof keys, v: number) => {
                results[k] = v;
                context.eval(results[0] * results[1]);
            };
            return auto(
                (key) => ({ eval: (v) => e(key, v) }),
                (key) => e(key, 0),
                value
            );
        }
    });
    const data = (): typeof b.types.ROOT => {
        return [
            [+inputV1.value, +inputV2.value],
            [+inputV3.value, +inputV4.value]
        ];
    };
    return {
        ...b.build(
            { eval: (output) => (btnToggle.innerHTML = \`value is \${output}\`) },
            data()
        ),
        data
    };
};

let action = make(modes[mode]);
const cycle = () => {
    mode = (mode + 1) % modes.length;
    action = make(modes[mode], action);
};
const update = () => action.update(action.data());

btnToggle.addEventListener("click", cycle);
inputV1.addEventListener("change", update);
inputV2.addEventListener("change", update);
inputV3.addEventListener("change", update);
inputV4.addEventListener("change", update);
`}
/>

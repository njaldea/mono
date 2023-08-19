<script lang="ts">
    import Sandbox from "../../../Sandbox.svelte";
</script>

<div>
    <Sandbox
        readonly
        libs={{
            "@nil-/jwalk": "https://unpkg.com/@nil-/jwalk",
            svelte: "https://unpkg.com/browse/svelte"
        }}
        code={`import { jwalker } from "@nil-/jwalk";
import type { SvelteComponent } from "svelte";

// masks to silence intellisense
type EPoint = SvelteComponent;
type VPoint = SvelteComponent;
type Object = SvelteComponent;

type Context = {
    target: HTMLDivElement;
    detail: {
        readonly key?: string | number;
        readonly notify: (path: string, value: unknown) => void;
    };
};

const toSvelteAction = (component: SvelteComponent) => ({
    update: (value) => component.$set({ value }),
    destroy: () => component.$destroy()
});

type Args = {
    target: HTMLElement;
    props: {
        value: readonly [number, number];
        detail: Context["detail"];
    }
};

const action = (cc: (args: Args) => SvelteComponent) => {
    return jwalker<Node>()
        .node("Point", "tuple", {
            content: ["number", "number"],
            action: ({ context: { detail, target }, value }) => {
                return toSvelteAction(cc({ target, props: { value: value, detail } }));
            }
        })
        .node("Group", "object", {
            content: ["123:Point"],
            action: ({ context: { detail, target }, value, refs, meta }) => {
                return toSvelteAction(new Object({
                    target,
                    props: { value, keys: meta.value, refs, detail }
                }));
            }
        })
        .node("ROOT", "object", {
            content: ["subgroup:Group", "point:Point", "point35:Point"],
            action: ({ context: { detail, target }, value, refs, meta }) => {
                return toSvelteAction(new Object({
                    target,
                    props: { value, keys: meta.value, refs, detail }
                }));
            }
        });
};

export const editor = () => action(args => new EPoint(args));
export const viewer = () => action(args => new VPoint(args));
`}
    />
</div>

<style>
    div {
        position: relative;
        min-height: 300px;
        flex: 1;
    }
</style>

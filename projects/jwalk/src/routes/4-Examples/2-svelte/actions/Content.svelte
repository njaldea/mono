<script lang="ts">
    import Sandbox from "../../../Sandbox.svelte";
</script>

<p>In this example, there are two actions provided.</p>

<ul>
    <li>viewer</li>
    <li>editor</li>
</ul>

<p>These will be used for two separate `jwalk` instance.</p>

<h3>utility</h3>

<Sandbox
    readonly
    height={840}
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

type Node = {
    target: HTMLDivElement;
    context: {
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
        context: Node["context"];
    }
};

const action = (cc: (args: Args) => SvelteComponent) => {
    return jwalker<Node>()
        .node("Point", "tuple", {
            value: ["number", "number"],
            action: ({ context, target }, { value }) => {
                return toSvelteAction(cc({ target, props: { value: value, context } }));
            }
        })
        .node("Group", "object", {
            value: ["123:Point"],
            action: ({ target, context }, { value, refs, meta }) => {
                return toSvelteAction(new Object({
                    target,
                    props: { value, keys: meta.value, refs, context }
                }));
            }
        })
        .node("ROOT", "object", {
            value: ["subgroup:Group", "point:Point", "point35:Point"],
            action: ({ target, context }, { value, refs, meta }) => {
                return toSvelteAction(new Object({
                    target,
                    props: { value, keys: meta.value, refs, context }
                }));
            }
        });
};

export const editor = () => {
    return action(args => new EPoint(args));
};

export const viewer = () => {
    return action(args => new VPoint(args));
};
`}
/>

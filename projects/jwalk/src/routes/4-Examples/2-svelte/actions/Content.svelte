<script lang="ts">
    import { tseditor } from "../../../tseditor";
    const detail = {
        readonly: true,
        libs: {
            "@nil-/jwalk": "https://unpkg.com/@nil-/jwalk",
            svelte: "https://unpkg.com/browse/svelte"
        },
        code: `import { jwalker } from "@nil-/jwalk";
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
                const component = cc({ target, props: { value: value, context } });
                return {
                    update: (value) => component.$set({ value }),
                    destroy: () => component.$destroy()
                };
            }
        })
        .node("Group", "object", {
            value: ["123:Point"],
            action: ({ target, context }, { value, refs, meta }) => {
                const component = new Object({
                    target,
                    props: {
                        value,
                        keys: meta.value,
                        refs,
                        context
                    }
                });
                return {
                    update: (value) => component.$set({ value }),
                    destroy: () => component.$destroy()
                };
            }
        })
        .node("ROOT", "object", {
            value: ["subgroup:Group", "point:Point", "point35:Point"],
            action: ({ target, context }, { value, refs, meta }) => {
                const component = new Object({
                    target,
                    props: {
                        value,
                        keys: meta.value,
                        refs,
                        context
                    }
                });
                return {
                    update: (value) => component.$set({ value }),
                    destroy: () => component.$destroy()
                };
            }
        });
};

export const editor = () => {
    return action(args => new EPoint(args));
};

export const viewer = () => {
    return action(args => new VPoint(args));
};
`
    };
</script>

<p>In this example, there are two actions provided.</p>

<ul>
    <li>viewer</li>
    <li>editor</li>
</ul>

<p>These will be used for two separate `jwalk` instance.</p>

<h3>utility</h3>

<div class="outer">
    <div class="inner" use:tseditor={detail} />
</div>

<style>
    .outer {
        background-color: rgb(104, 100, 100);
        padding-block: 10px;
        width: 100%;
        height: 840px;
    }
    .inner {
        width: 100%;
        height: 100%;
    }
</style>

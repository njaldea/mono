import { jwalker } from "$lib";

import EPoint from "../components/EPoint.svelte";
import Object from "../components/Object.svelte";

import type { Node } from "./types";

export const editor = () => {
    return jwalker<Node>()
        .node("Point", "tuple", {
            value: ["number", "number"],
            action: ({ context, target }, { value }) => {
                const component = new EPoint({ target, props: { value, context } });
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
            action: ({ target, context }, { value, refs, meta, auto }) => {
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

import { jwalker } from "$lib";

import VPoint from "../1-components/VPoint.svelte";
import Object from "../1-components/Object.svelte";

import type { Node } from "./types";

export const viewer = () => {
    return jwalker<Node>()
        .node("Point", "tuple", {
            value: ["number", "number"],
            action: ({ context, target }, { value }) => {
                const component = new VPoint({ target, props: { value: value, context } });
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

import { jwalker } from "$lib";

import VPoint from "../1-components/VPoint.svelte";
import Object from "../1-components/Object.svelte";

import type { Node, Adapter } from "./types";

const vadapter: Adapter = (action, context, key) => {
    return (target, value) => {
        return action(
            {
                target,
                context: {
                    key: key
                }
            },
            value
        );
    };
};

export const viewer = () => {
    return jwalker<Node>()
        .node("Point", "tuple", {
            value: [{ type: "number" }, { type: "number" }] as const,
            action: ({ context, target }, { value }) => {
                const component = new VPoint({
                    target,
                    props: { value: value, context }
                });
                return {
                    update: (value) => component.$set({ value }),
                    destroy: () => component.$destroy()
                };
            }
        })
        .node("Group", "object", {
            action: ({ context, target }, { value, actions }) => {
                const component = new Object({
                    target,
                    props: {
                        value,
                        actions,
                        title: context.key ? `Group - ${context.key}` : "Group",
                        context,
                        adapter: vadapter
                    }
                });
                return {
                    update: (value) => component.$set({ value }),
                    destroy: () => component.$destroy()
                };
            }
        });
};

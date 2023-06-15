import { jwalker } from "$lib";

import EPoint from "../1-components/EPoint.svelte";
import Object from "../1-components/Object.svelte";

import type { Node, Adapter } from "./types";

const eadapter: Adapter = (action, context, key) => {
    return (target, value) => {
        return action(
            {
                target,
                context: {
                    notify: (path, value) => context.notify?.(`/${key}${path}`, value),
                    key: key
                }
            },
            value
        );
    };
};

export const editor = () => {
    return jwalker<Node>()
        .node("Point", "tuple", {
            value: [{ type: "number" }, { type: "number" }] as const,
            action: ({ target, context }, detail) => {
                const component = new EPoint({
                    target,
                    props: { value: detail.value, context }
                });
                return {
                    update: (value) => component.$set({ value }),
                    destroy: () => component.$destroy()
                };
            }
        })
        .node("Group", "object", {
            action: ({ target, context }, detail) => {
                const component = new Object({
                    target,
                    props: {
                        value: detail.value,
                        actions: detail.actions,
                        title: context.key ? `Group - ${context.key}` : "Group",
                        context,
                        adapter: eadapter
                    }
                });
                return {
                    update: (value) => component.$set({ value }),
                    destroy: () => component.$destroy()
                };
            }
        });
};

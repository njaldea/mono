import { jwalker } from "$lib";

import EPoint from "../1-components/EPoint.svelte";
import Object from "../1-components/Object.svelte";
import { toSvelteAction } from "./adapter";

import type { Node } from "./types";

export const editor = () => {
    return jwalker<Node>()
        .node("Point", "tuple", {
            value: ["number", "number"],
            action: ({ context, target }, { value }) => {
                return toSvelteAction(EPoint, target, { value: value, context });
            }
        })
        .node("Group", "object", {
            value: ["123:Point"],
            action: ({ target, context }, { value, auto }) => {
                return toSvelteAction(Object, target, {
                    value,
                    actions: auto,
                    title: context.key ? `Group - ${context.key}` : "Group",
                    context
                });
            }
        })
        .node("ROOT", "object", {
            value: ["subgroup:Group", "point:Point", "point35:Point"],
            action: ({ target, context }, { value, auto }) => {
                return toSvelteAction(Object, target, {
                    value,
                    actions: auto,
                    title: context.key ? `Group - ${context.key}` : "Group",
                    context
                });
            }
        });
};

import { jwalker } from "$lib";

import EPoint from "../components/EPoint.svelte";
import VPoint from "../components/VPoint.svelte";
import Object from "../components/Object.svelte";

import type { Context } from "./types";
import type { SvelteComponent } from "svelte";

type Args = {
    target: HTMLElement;
    props: {
        value: readonly [number, number];
        detail: Context["detail"];
    };
};

const action = (cc: (args: Args) => SvelteComponent) => {
    return jwalker<Context>()
        .node("Point", "tuple", {
            content: ["number", "number"],
            action: ({ context: { detail, target }, value }) => {
                const component = cc({ target, props: { value: value, detail } });
                return {
                    update: (value) => component.$set({ value }),
                    destroy: () => component.$destroy()
                };
            }
        })
        .node("Group", "object", {
            content: ["123:Point"],
            action: ({ context: { detail, target }, value, refs, meta }) => {
                const component = new Object({
                    target,
                    props: {
                        value,
                        keys: meta.content,
                        refs,
                        detail
                    }
                });
                return {
                    update: (value) => component.$set({ value }),
                    destroy: () => component.$destroy()
                };
            }
        })
        .node("ROOT", "object", {
            content: ["subgroup:Group", "point:Point", "point35:Point"],
            action: ({ context: { detail, target }, value, refs, meta }) => {
                const component = new Object({
                    target,
                    props: {
                        value,
                        keys: meta.content,
                        refs,
                        detail
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
    return action((args) => new EPoint(args));
};

export const viewer = () => {
    return action((args) => new VPoint(args));
};

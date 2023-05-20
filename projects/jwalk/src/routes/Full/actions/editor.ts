import { jwalker } from "$lib";

import EPose from "../components/EPose.svelte";
import Group from "../components/Group.svelte";

const eadapter = (action, context, key) => {
    return (target: HTMLDivElement, value) => {
        return action(
            {
                target,
                context: {
                    notify: (path: string, value: any) => {
                        context.notify(`/${key}${path}`, value);
                    },
                    key: key
                }
            },
            value
        );
    };
};

export const editor = () => {
    return jwalker<{ target: HTMLDivElement; context: any; key?: string }>()
        .add(
            "Pose",
            "tuple",
            [{ type: "number" }, { type: "number" }, { type: "number" }] as const,
            {
                action: (detail, value) => {
                    const component = new EPose({
                        target: detail.target,
                        props: { value, context: detail.context }
                    });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            }
        )
        .add("Group", "object", {
            action: (detail, value, { actions }) => {
                const component = new Group({
                    target: detail.target,
                    props: {
                        value,
                        actions,
                        title: "Group",
                        context: detail.context,
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

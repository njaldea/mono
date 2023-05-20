import { jwalker } from "$lib";

import VPose from "../components/VPose.svelte";
import Group from "../components/Group.svelte";

const vadapter = (action, context, key) => {
    return (target: HTMLDivElement, value) => {
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
    return jwalker<{ target: HTMLDivElement; context: any; key?: string }>()
        .add(
            "Pose",
            "tuple",
            [{ type: "number" }, { type: "number" }, { type: "number" }] as const,
            {
                action: (detail, value) => {
                    const component = new VPose({
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

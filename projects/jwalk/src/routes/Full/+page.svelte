<script lang="ts">
    import EPose from "./EPose.svelte";
    import VPose from "./VPose.svelte";
    import Group from "./Group.svelte";
    import { jwalker } from "$lib";

    let vpose: [number, number, number] = [1, 2, 3];

    const context = {
        notify: (path: string, value: number) => {
            console.log("change", path, value);
            if (path === "/pose/0") {
                vpose[0] = value + 1;
            } else if (path === "/pose/1") {
                vpose[1] = value + 1;
            } else if (path === "/pose/2") {
                vpose[2] = value + 1;
            }
        }
    };

    const eadapter = (action, context, key) => {
        return (target: HTMLDivElement, value) => {
            return action({
                target,
                context: {
                    notify: (path: string, value: any) => {
                        context.notify(`/${key}${path}`, value);
                    }
                }
            }, value);
        }
    };
    const vaction = <T>(action: T) => action;

    const editor = (
        target: HTMLDivElement,
        value: { pose: [number, number, number]; }
    ) => {
        return jwalker<{ target: HTMLDivElement; context: any }>()
            .add("Pose", "tuple", [
                { type: "number" },
                { type: "number" },
                { type: "number" }
            ] as const, {
                action: (detail, value) => {
                    const component = new EPose({ target: detail.target, props: { value, context: detail.context } });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            })
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
            })
            .add("ROOT", "Group", [
                { type: "Pose", key: "pose" },
                { type: "Pose", key: "pose2" }
            ] as const)
            .build({ target, context }, value);
    };

    const viewer = (
        target: HTMLDivElement,
        value: { pose: [number, number, number]; }
    ) => {
        return jwalker<HTMLDivElement>()
            .add("Pose", "tuple", [
                { type: "number" },
                { type: "number" },
                { type: "number" }
            ] as const, {
                action: (target, value) => {
                    const component = new VPose({ target, props: { value } });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            })
            .add("Group", "object", {
                action: (target, value, { actions }) => {
                    const component = new Group({
                        target,
                        props: {
                            value,
                            actions,
                            title: "Group",
                            context: null,
                            adapter: vaction
                        }
                    });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            })
            .add("ROOT", "Group", [{ type: "Pose", key: "pose" }] as const)
            .build(target, value);
    };

</script>

<div class="top">
    <div use:editor={{pose: vpose}} />
    <div use:viewer={{pose: vpose}} />
</div>

<style>
    .top {
        width: 500px;
        /* outline: red solid 1px; */
    }
</style>

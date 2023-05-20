<script lang="ts">
    import Boolean from "./Boolean.svelte";
    import Number from "./Number.svelte";
    import String from "./String.svelte";
    import Tuple from "./Tuple.svelte";
    import Object from "./Object.svelte";
    import Group from "./Group.svelte";
    import Range from "./Range.svelte";
    import { jwalker } from "$lib";

    let vnum = 100;
    let vstr = "text";

    const jwalk = (
        target: HTMLDivElement,
        value: {
            nn: number;
            ss: string;
            tt: [string, number];
            pt: [number, number, [number, string, [boolean, boolean]]];
            pp: [number, number, [number, string], { xx: number; yy: string }];
        }
    ) => {
        return jwalker<HTMLDivElement>()
            .add("Number", "number", {
                action: (target, value) => {
                    const component = new Number({ target, props: { value } });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            })
            .add("Range", "number", {
                action: (target, value) => {
                    const component = new Range({
                        target,
                        props: { value, options: { min: 1, max: 10 } }
                    });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            })
            .add("Boolean", "boolean", {
                action: (target, value) => {
                    const component = new Boolean({ target, props: { value } });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            })
            .add("String", "string", {
                action: (target, value) => {
                    const component = new String({ target, props: { value } });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            })
            .add("Object", "object", {
                action: (target, value, { actions }) => {
                    const component = new Object({ target, props: { value, actions } });
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
                        props: { value, actions, title: "Group" }
                    });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            })
            .add("Tuple", "tuple", {
                action: (target, value, { actions }) => {
                    const component = new Tuple({ target, props: { value, actions } });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            })
            .add("FixedTuple", "tuple", [{ type: "number" }] as const, {
                action: (target, value, { actions }) => {
                    const component = new Tuple({ target, props: { value, actions } });
                    return {
                        update: (value) => component.$set({ value }),
                        destroy: () => component.$destroy()
                    };
                }
            })
            .add("ROOT", "Group", [
                { type: "Number", key: "nn" },
                { type: "String", key: "ss" },
                { type: "Tuple", key: "tt", value: [{ type: "String" }, { type: "Range" }] },
                {
                    type: "Tuple",
                    key: "pt",
                    value: [
                        { type: "Range" },
                        { type: "Number" },
                        {
                            type: "Tuple",
                            value: [
                                { type: "Number" },
                                { type: "String" },
                                { type: "Tuple", value: [{ type: "Boolean" }, { type: "Boolean" }] }
                            ]
                        }
                    ]
                },
                {
                    type: "Tuple",
                    key: "pp",
                    value: [
                        { type: "Range" },
                        { type: "Number" },
                        { type: "Tuple", value: [{ type: "Number" }, { type: "String" }] },
                        {
                            type: "Object",
                            value: [
                                { type: "Number", key: "xx" },
                                { type: "String", key: "yy" }
                            ]
                        }
                    ]
                }
            ] as const)
            .build(target, value);
    };

    $: value = {
        nn: vnum,
        ss: vstr,
        tt: [vstr, vnum],
        pt: [vnum * 2, vnum, [1101, "asd", [true, false]]],
        pp: [vnum, vnum * 2, [vnum * 4, vstr], { xx: vnum, yy: vstr }]
    } as {
        nn: number;
        ss: string;
        tt: [string, number];
        pt: [number, number, [number, string, [boolean, boolean]]];
        pp: [number, number, [number, string], { xx: number; yy: string }];
    };
</script>

<div class="top">
    <input type="number" bind:value={vnum} />
    <input type="text" bind:value={vstr} />
    <div use:jwalk={value} />
</div>

<style>
    .top {
        width: 500px;
        /* outline: red solid 1px; */
    }
</style>

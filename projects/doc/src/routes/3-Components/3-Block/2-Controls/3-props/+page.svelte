<script lang="ts">
    import { Block, Instance, Controls, type Prop } from "$lib";
    import Component from "../../Component.svelte";

    import MD from "./MD.svx";

    const defaults = {
        vText: "text",
        vColor: "#ffffff",
        vNumber: 1,
        vRange: 3,
        vSelect: "select",
        vToggle: true,
        vArray: [1, "string", false, undefined] as [number, string, boolean, any],
        vObject: {
            vText: "world",
            vAny: undefined,
            vNumber: 111,
            vToggle: true
        } as {
            vText: string;
            vAny: any;
            vNumber: number;
            vToggle: boolean;
        }
    };

    const props: Prop[] = [
        ["vText", "text"],
        ["vColor", "color", "hex"],
        ["vNumber", "number"],
        ["vRange", "range", 0, 10, 1],
        ["vSelect", "select", ["A", "B", "C"]],
        ["vToggle", "toggle"],
        {
            name: "vArray",
            type: "tuple",
            values: [["number"], ["text"], ["toggle"], ["tuple", [["text"]]]]
        },
        ["vButton", "button", () => () => alert("button")],
        {
            name: "vObject",
            type: "table",
            values: [
                ["vText", "text"],
                ["vAny", "table", [["vText", "text"]]],
                ["vButton", "button", () => () => alert("button1")]
            ]
        }
    ];
</script>

<MD>
    <Block>
        <Instance {defaults}>
            {#snippet children({ values, events })}
                <Component
                    {...values}
                    tag={"tag"}
                    left_click={events["left_click"]}
                    right_click={events["right_click"]}
                />
            {/snippet}
        </Instance>
        <Controls
            props={[["Click Me!", "button", () => () => alert("Button Is Clicked")], ...props]}
        />
    </Block>
</MD>

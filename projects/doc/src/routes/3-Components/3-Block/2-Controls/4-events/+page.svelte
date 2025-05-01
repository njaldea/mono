<script lang="ts">
    import { Block, Instance, Controls, type Prop, type Event } from "$lib";
    import Component from "../../Component.svelte";

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
            vNumber: 1101,
            vToggle: false,
            vAny: undefined
        } as {
            vText: string;
            vNumber: number;
            vToggle: boolean;
            vAny: any;
        }
    };
</script>

<div class="root">
    <Block>
        <Instance {defaults}>
            {#snippet children({ values, events: { left_click, right_click } })}
                <Component {...values} tag={"tag"} {left_click} {right_click} />
            {/snippet}
        </Instance>
        <Controls events={["left_click", "right_click"]} />
    </Block>
</div>

<style>
    .root {
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
    }
</style>

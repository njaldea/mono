<script lang="ts">
    import SUT from "./SUT.svelte";
    import { Controls, Template, Block, Params } from "@nil-/doc";
</script>

<Block>
    <Template defaults={{ v1: 0, v2: "v2", v3: "0", v4: undefined }} let:props={{ v1, v2, v3, v4 }}>
        <div class="template">
            <SUT {v1} {v2} {v3} {v4} />
        </div>
    </Template>

    <Params tag="s1" props={{ v2: "t", v3: "1", v4: true }} />
    <Params tag="s2" props={{}} />
    <Params tag="s3" props={{ v2: "t", v3: "1", v4: true }} />

    <Controls
        props={[
            {
                name: "v1",
                type: "number",
                min: 0,
                max: 10,
                step: 1
            },
            {
                name: "v2",
                type: "text"
            },
            {
                name: "v3",
                type: "select",
                values: ["1", "2"]
            },
            {
                name: "v4",
                type: "switch"
            }
        ]}
    />
</Block>

<style>
    .template {
        height: 300px;
    }
</style>

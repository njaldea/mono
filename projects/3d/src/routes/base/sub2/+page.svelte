<script lang="ts">
    import SUT from "./SUT.svelte";
    import { Controls, Template, Story } from "@nil-/doc";

    const defaults = {
        v1: 1,
        v2: "string",
        v3: "str",
        v4: true
    };
</script>

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
    events={[]}
/>

<Template {defaults} let:props>
    <div class="template">
        <SUT {...props} />
    </div>
</Template>

<Story name="s2" props={{}} />
<Story name="s1" props={{ v2: "t", v3: "1", v4: true }} />

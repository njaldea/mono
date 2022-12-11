<script lang="ts">
    import Block from "$lib/components/block/Block.svelte";
    import Params from "$lib/components/block/Params.svelte";
    import Controls from "$lib/components/block/Controls.svelte";
    import Template from "$lib/components/block/Template.svelte";

    const defaults = {
        v_tuple: [true, 0, "hello", [false, 1, "world"], undefined]
    };
</script>

# Controls

Roles of each controls:
- responsible in handling only one type of data
- disabling the checkbox will result in an undefined value
- re-enabling the checkbox will revive the previous valid value
- for grouped controls
    - disabling top level checkbox does the same thing
    - will collapse the children when disabled
    - re-enabling will recreate the previous state of each children

---

<Block>
    <Template
        let:props
        {defaults}
    >
        <br/>

        > Default value

        <pre><code>{JSON.stringify(defaults, null, 4)}</code></pre>

        > Resolved value

        <pre><code>{JSON.stringify(props, null, 4)}</code></pre>
    </Template>
    <Params tag="first"/>
    <Controls
        expand
        props={[
            {
                name: "v_tuple",
                type: "tuple",
                values: [
                    {
                        type: "switch"
                    },
                    {
                        type: "number"
                    },
                    {
                        type: "text"
                    },
                    {
                        type: "tuple",
                        values: [
                            {
                                type: "switch"
                            },
                            {
                                type: "number"
                            },
                            {
                                type: "text"
                            }
                        ]
                    },
                    {
                        type: "text"
                    },
                ]
            }
        ]}
    />
</Block>

<style>
    pre {
        margin: 0;
    }
</style>
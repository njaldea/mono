<script lang="ts">
    import Block from "$lib/components/block/Block.svelte";
    import Params from "$lib/components/block/Params.svelte";
    import Controls from "$lib/components/block/Controls.svelte";
    import Template from "$lib/components/block/Template.svelte";

    const defaults = {
        v_tuple: [true, 1, "hello", [false, 2, "world"], undefined],
        params_default: undefined,
        description: undefined
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

<div class="column">
    <Block>
        <Template
            let:props
            {defaults}
            columns
        >
            <div class="content">
                <div>{props.description}</div>
                <div>

                > Default value

                </div>
                <div>
                    <pre><code>{JSON.stringify({ v_tuple: defaults.v_tuple }, null, 4)}</code></pre>
                </div>

                <div>

                > Params Prop value
            
                </div>

                <div>
                    <pre><code>{JSON.stringify({ v_tuple: props.params_default }, null, 4)}</code></pre>
                </div>

                <div>

                ---

                </div>

                <div>

                > Resolved value

                </div>

                <div>
                    <pre><code>{JSON.stringify({ v_tuple: props.v_tuple }, null, 4)}</code></pre>
                </div>
            </div>
        </Template>
        <Params tag="first" props={{
            description: "Props not provided to Params"
        }}/>
        <Params tag="secod" props={{
            v_tuple: [
                false, undefined, "world"
            ],
            params_default: [
                false, undefined, "world"
            ],
            description: [
                "Props partially provided to Params.",
                "Some are undefined.",
                "Undefined should follow the Default param values."
            ].join('\n')
        }}/>
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
</div>

<style>
    .content {
        display: grid;
        grid-template-rows: 90px 50px 310px 50px 170px 50px 50px 1fr;
        height: 1100px;
        white-space: pre;
        box-sizing: border-box;
        padding: 5px;
    }

    .column {
        height: 150%;
    }

    pre {
        margin: 0;
    }
</style>
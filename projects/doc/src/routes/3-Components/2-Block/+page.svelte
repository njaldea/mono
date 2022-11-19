<script lang='ts'>
    import Block from "$lib/components/block/Block.svelte";
    import Template from '$lib/components/block/Template.svelte';
    import Params from '$lib/components/block/Params.svelte';
    import Controls from '$lib/components/block/Controls.svelte';
</script>

123

<Block>
    <Template
        defaults={{v1: 2}}
        let:props
        let:tag
    >
        <div>
            {tag}
        </div>
        <div>
            {JSON.stringify(props)}
        </div>
    </Template>

    <Params tag="first" props={{v1: 1}}/>
    <Params tag="second" props={{}}/>

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

123

<style>
    div {
        width: 3000px;
    }
</style>
<script lang="ts">
    import Container from "$lib/components/etc/Container.svelte";

    import Block from "$lib/components/block/Block.svelte";
    import Template from "$lib/components/block/Template.svelte";
    import Params from "$lib/components/block/Params.svelte";

    const params = {
        "vertical primary": {
            vertical: true,
            secondary: false,
            description: [
                "primary: on left",
                "secondary: on right",
                "collapsing removes secondary"
            ].join('\n')
        },
        "vertical secondary": {
            vertical: true,
            secondary: true,
            description: [
                "primary: on left",
                "secondary: on right",
                "collapsing removes primary"
            ].join('\n')
        },
        "horizontal primary": {
            vertical: false,
            secondary: false,
            description: [
                "primary: on top",
                "secondary: on bottom",
                "collapsing removes secondary"
            ].join('\n')
        },
        "horizontal secondary": {
            vertical: false,
            secondary: true,
            description: [
                "primary: on top",
                "secondary: on bottom",
                "collapsing removes primary"
            ].join('\n')
        }
    }
</script>

# Container

Create a layout where in:
- `primary` is at top/left
- `secondary` is at bottom/right
- `primary` is the main content until `secondary` flag is enabled
- offset is the initial width/height of the main content
- padding is the minimum distance of the divider from the edges
- clicking the divider will only show the main content

<Block>
    <Template
        let:props
        let:tag
        defaults={{
            vertical: false,
            secondary: false,
            description: undefined
        }}
        noreset
    >
        <div class="container">
            <Container
                offset={200}
                padding={100}
                vertical={props.vertical}
                secondary={props.secondary}
            >
                <svelte:fragment slot="primary">
                    <div class="content">
                        {tag}
                    </div>
                </svelte:fragment>
                <svelte:fragment slot="secondary">
                    <div class="content">
                        {props.description}
                    </div>
                </svelte:fragment>
            </Container>
        </div>
    </Template>

    {#each Object.entries(params) as [tag, props] (tag)}
        <Params {tag} {props}/>
    {/each}
</Block>

<style>
    .container {
        min-width: 500px;
        height: 500px;
        outline: solid 1px white;
    }

    .content {
        padding: 10px;
        white-space: pre-line;
    }
</style>
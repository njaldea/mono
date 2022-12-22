<script lang="ts">
    import Template from "$lib/components/block/Template.svelte";
    import Params from "$lib/components/block/Params.svelte";

    type Args = $$Generic;

    export let defaults: Args | undefined = undefined;
    export let noreset = false;

    const cast = (t: Args) => t;
</script>

<Template {defaults} {noreset} let:props let:key>
    <slot props={cast(props)} {key} />
</Template>
<Params />

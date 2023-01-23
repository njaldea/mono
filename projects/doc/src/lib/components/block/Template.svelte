<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { getDefaults, getParams, getOrientation, type Params } from "./context";
    import { resolve } from "./utils";

    import Instance from "./Instance.svelte";

    const params = getParams();
    const defaultsStore = getDefaults();
    const orientation = getOrientation();

    type Args = $$Generic;

    export let defaults: Args | undefined = undefined;
    export let noreset = false;
    export let columns = false;
    export let scale = false;

    $: $defaultsStore = (defaults ?? {}) as Params;
    $: $orientation = columns;

    /**
     * This flag is to rerender the whole slot component.
     * If the control is disabled, we use the default value provided from the defaults field.
     * If the value of a prop is undefined, we will have to forward this value to the slot.
     * Problem is, if the slot component has a default value set, it is only
     * evaluated during component creation, not in subsequent updates.
     *
     * The solution is to rerender the whole slot whenever there is an control update.
     *
     * Similar case to: https://github.com/sveltejs/svelte/issues/4442
     */
    let key = false;
    beforeUpdate(() => (key = !key));

    const resolveArgs = resolve<Args>;
    const cast = (t: Args) => t;
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/2-Block/1-Content/2-Template) for more details.
-->

{#each $params as param (param.id)}
    <Instance
        defaults={resolveArgs($defaultsStore, param.values)}
        {noreset}
        {scale}
        let:key
        let:props
        let:events
    >
        <slot id={param.id} tag={param.tag} props={cast(props)} {events} {key} />
    </Instance>
{/each}

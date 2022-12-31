<script lang="ts">
    import { beforeUpdate } from "svelte";
    import {
        getDefaults,
        getParams,
        type Params,
        getOrientation
    } from "$lib/components/block/context";
    import { resolve } from "$lib/components/block/utils";

    import Instance from "$lib/components/block/Instance.svelte";

    const params = getParams();
    const defaultsStore = getDefaults();
    const orientation = getOrientation();

    type Args = $$Generic;

    export let defaults: Args | undefined = undefined;
    export let noreset = false;
    export let columns = false;
    $: $defaultsStore = (defaults ?? {}) as Params;
    $: $orientation = columns;

    const resolveArgs = resolve<Args>;

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

    const cast = (t: Args) => t;
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/2-Block/2-Template) for more details.
-->

{#each $params as param (param.id)}
    <Instance defaults={resolveArgs($defaultsStore, param.values)} {noreset} let:key let:props>
        <slot id={param.id} tag={param.tag} props={cast(props)} {key} />
    </Instance>
{/each}

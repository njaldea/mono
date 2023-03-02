<script lang="ts">
    import { beforeUpdate } from "svelte";

    import { getControls, getControlsState } from "./context";

    import Props from "./controls/props/Props.svelte";
    import Events from "./controls/events/Events.svelte";
    import { resolve } from "./utils";

    const controls = getControls();
    const controlsState = getControlsState();

    $: expanded = $controlsState.position !== "hidden";

    type PropArgs = $$Generic;

    export let defaults: PropArgs | undefined = undefined;
    export let noreset = false;

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

    const resolveArgs = resolve<PropArgs>;
    let bound = {};

    // Need to hide bound from svelte reactivity logic since bound variable is also modified by the control bindings
    const updateBound = (d: PropArgs | undefined) => (bound = resolve(d ?? {}, {}));
    $: updateBound(defaults);

    let handlers: Record<string, (ev: CustomEvent<unknown>) => void> = {};
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/2-Block/1-Content/1-Instance) for more details.
-->

<div class="instance" class:cside={expanded && "right" === $controlsState.position}>
    <div class="content">
        {#if noreset}
            <slot props={resolveArgs(defaults ?? {}, bound)} events={handlers} {key} />
        {:else}
            {#key key}
                <slot props={resolveArgs(defaults ?? {}, bound)} events={handlers} {key} />
            {/key}
        {/if}
    </div>
    {#if expanded}
        <div class="misc">
            <Props
                infos={$controls.props}
                bind:values={bound}
                visible={$controlsState.mode === "prop"}
            >
                <div>
                    <div>Name</div>
                    <div>Value</div>
                    <div>Use</div>
                </div>
            </Props>
            <Events
                events={$controls.events}
                bind:handlers
                visible={$controlsState.mode === "event"}
            >
                <div>
                    <div>Events</div>
                    <div>Detail</div>
                </div>
            </Events>
        </div>
    {/if}
</div>

<style>
    .instance {
        width: 100%;
        height: 100%;
    }

    .cside {
        display: grid;
        grid-template-columns: 1fr 35rem;
    }

    .content {
        min-height: 6.25rem;
    }

    .misc {
        user-select: none;
    }

    .content,
    .misc {
        border: 1px solid var(--i-nil-doc-block-outline-color);
    }

    /* colors */
    .instance {
        transition: background-color var(--i-nil-doc-transition-time);
        color: var(--i-nil-doc-color);
        background-color: var(--i-nil-doc-bg-color);
    }
</style>

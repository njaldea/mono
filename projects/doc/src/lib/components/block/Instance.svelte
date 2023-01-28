<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { cquery } from "./action";

    import { getControls, getControlsState } from "./context";
    import { getTheme } from "../context";

    import Props from "./controls/props/Props.svelte";
    import Events from "./controls/events/Events.svelte";
    import { resolve } from "./utils";

    const controls = getControls();
    const controlsState = getControlsState();
    const dark = getTheme();

    $: hasProps = $controls.props.length > 0;
    $: hasEvents = $controls.events.length > 0;
    let cvisible: "props" | "events" | null = null;

    $: if (cvisible == null && hasProps) {
        cvisible = "props";
    } else if (cvisible == null && hasEvents) {
        cvisible = "events";
    } else if (!hasProps && !hasEvents) {
        cvisible = null;
    }

    $: expanded = !$controlsState.hide && cvisible != null;

    type PropArgs = $$Generic;

    export let defaults: PropArgs | undefined = undefined;
    export let noreset = false;
    export let scale = false;

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

    let handlers: Record<string, (ev: CustomEvent<unknown>) => void>;
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/2-Block/1-Content/1-Instance) for more details.
-->

<div
    class="instance"
    class:scale
    class:cside={expanded && "right" === $controlsState.position}
    use:cquery={{
        class: "cside",
        min: 1000,
        w: true,
        enabled: expanded && $controlsState.position === undefined
    }}
>
    {#if noreset}
        <div class="content scrollable" class:dark={$dark}>
            <slot props={resolveArgs(defaults ?? {}, bound)} events={handlers} {key} />
        </div>
    {:else}
        {#key key}
            <div class="content scrollable" class:dark={$dark}>
                <slot props={resolveArgs(defaults ?? {}, bound)} events={handlers} {key} />
            </div>
        {/key}
    {/if}
    {#if expanded}
        <div class="misc scrollable" class:dark={$dark}>
            <Props infos={$controls.props} bind:values={bound} visible={cvisible == "props"}>
                <div on:dblclick={() => hasEvents && (cvisible = "events")}>
                    <div>Properties</div>
                    <div>Value</div>
                    <div>Use</div>
                </div>
            </Props>
            <Events events={$controls.events} bind:handlers visible={cvisible == "events"}>
                {#if cvisible == "events"}
                    <div on:dblclick={() => hasProps && (cvisible = "props")}>
                        <div>Events</div>
                        <div>Detail</div>
                    </div>
                {/if}
            </Events>
        </div>
    {/if}
</div>

<style>
    div {
        box-sizing: border-box;
    }

    .instance {
        overflow: hidden;
    }

    .instance.scale {
        transition: transform 350ms;
    }

    .instance.scale:hover {
        transform: scale(1.015);
    }

    .cside {
        display: grid;
        grid-template-columns: 1fr 550px;
    }

    .content {
        min-height: 100px;
        border-radius: 5px;
    }

    div:not(.cside) > .misc {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        user-select: none;
    }

    .cside > .misc {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        user-select: none;
    }

    .content,
    .misc {
        border-style: solid;
        border-width: 1px;
        padding: 2px;
    }

    /* scrollable */
    .scrollable {
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    .scrollable::-webkit-scrollbar {
        display: none;
    }

    /* colors */
    .content,
    .misc {
        border-color: hsl(0, 2%, 60%);
        background-color: hsl(0, 0%, 100%);
        transition: border-color 350ms, background-color 350ms;
    }

    .dark.content,
    .dark.misc {
        border-color: hsl(0, 2%, 40%);
        background-color: hsl(200, 4%, 14%);
    }
</style>

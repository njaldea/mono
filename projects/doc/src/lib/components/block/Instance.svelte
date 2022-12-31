<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { cquery } from "./action";

    import { getControls, getControlsState, type ValueType } from "$lib/components/block/context";
    import { getTheme } from "$lib/components/context";

    import Controls from "./controls/Controls.svelte";
    import { resolve } from "./utils";

    const controls = getControls();
    const controlsState = getControlsState();
    const dark = getTheme();

    $: expanded = $controls.length > 0 && !$controlsState.hide;

    type Args = $$Generic;

    export let defaults: Args | undefined = undefined;
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

    const resolveArgs = resolve<Args>;
    let bound = {};

    // Need to hide bound from svelte reactivity logic since bound variable is also modified by the control bindings
    const updateBound = (d: Args | undefined) => {
        bound = resolve<Record<string, ValueType>>(d ?? {}, {});
    };
    $: updateBound(defaults);
</script>

<div
    class="instance"
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
            <slot props={resolveArgs(defaults ?? {}, bound)} {key} />
        </div>
    {:else}
        {#key key}
            <div class="content scrollable" class:dark={$dark}>
                <slot props={resolveArgs(defaults ?? {}, bound)} {key} />
            </div>
        {/key}
    {/if}
    {#if expanded}
        <div class="misc scrollable" class:dark={$dark}>
            <Controls infos={$controls} bind:values={bound} />
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

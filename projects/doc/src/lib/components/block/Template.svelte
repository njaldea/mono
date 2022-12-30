<script lang="ts">
    import { getParams, getDefaults } from "./context";
    import { getControls, getControlsState } from "./context";
    import { resolve } from "./utils";
    import { getTheme } from "$lib/components/context";

    import Controls from "./controls/Controls.svelte";
    import { cquery } from "./action";
    import type { Params } from "./context";

    import { beforeUpdate } from "svelte";

    const params = getParams();
    const controls = getControls();
    const controlsState = getControlsState();
    const defaultsStore = getDefaults();
    const isDark = getTheme();

    type Args = $$Generic;

    export let defaults: Args | undefined = undefined;
    export let noreset = false;
    export let columns = false;

    const reset = () => {
        $params = [];
        $defaultsStore = defaults as Params;
    };

    $: $defaultsStore, reset();

    const resolveArgs = resolve<Args>;

    $: expanded = $controls.length > 0 && !$controlsState.hide;

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
</script>

<div class="template" class:columns class:dark={$isDark}>
    {#each $params as param (param.id)}
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
                <div class="content scrollable" class:dark={$isDark}>
                    <slot
                        id={param.id}
                        tag={param.tag}
                        props={resolveArgs(param.defaults, param.values)}
                        {key}
                    />
                </div>
            {:else}
                {#key key}
                    <div class="content scrollable" class:dark={$isDark}>
                        <slot
                            id={param.id}
                            tag={param.tag}
                            props={resolveArgs(param.defaults, param.values)}
                            {key}
                        />
                    </div>
                {/key}
            {/if}
            {#if expanded}
                <div class="misc scrollable" class:dark={$isDark}>
                    <Controls infos={$controls} bind:values={param.values} />
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    div {
        box-sizing: border-box;
    }

    .template {
        display: grid;
        padding-bottom: 10px;
        padding-top: 10px;
        grid-auto-rows: 1fr;
        grid-auto-columns: auto;
        grid-auto-flow: row;
        border-radius: 5px;
    }

    .template.columns {
        grid-auto-rows: auto;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
    }

    .template > .cside {
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

    .template > .cside > .misc {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        user-select: none;
    }

    .instance {
        overflow: hidden;
    }

    .content,
    .misc {
        margin: 3px;
        border-style: solid;
        border-width: 1px;
        padding: 1px;
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
    .template {
        color: hsl(0, 0%, 0%);
        background-color: hsl(0, 2%, 70%);
        transition: color 350ms, background-color 350ms;
    }

    .template.dark {
        color-scheme: dark;
        color: hsl(0, 0%, 80%);
        background-color: hsl(0, 2%, 40%);
    }

    .content,
    .misc {
        border-color: hsl(0, 2%, 60%);
        background-color: hsl(0, 0%, 100%);
        transition: border-color 350ms, background-color 350ms;
    }

    .dark .content,
    .dark .misc {
        border-color: hsl(0, 2%, 40%);
        background-color: hsl(200, 4%, 14%);
    }
</style>

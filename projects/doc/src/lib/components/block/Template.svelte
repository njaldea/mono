<script lang="ts">
    import { getParams, getCurrent, getDefaults } from "./context";
    import { getControls, getControlsState } from "./context";
    import { resolve } from "./utils";
    import { getTheme } from "$lib/components/context";

    import Controls from "./controls/Controls.svelte";
    import type { Params } from "./context";

    import { beforeUpdate } from "svelte";
    import { slide } from "svelte/transition";

    const params = getParams();
    const current = getCurrent();
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

    let hovered: number | null = null;

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
</script>

<svelte:window on:click={() => ($current = null)} />

<div class="template" class:columns>
    {#each $params as param (param.id)}
        <div
            class="scrollable"
            on:click|stopPropagation={() => ($current = param.id)}
            on:mouseenter={() => (hovered = param.id)}
            on:mouseleave={() => (hovered = null)}
            on:keypress={null}
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
            {#if $controls.length > 0 && ($controlsState.expand || $current === param.id || hovered === param.id)}
                <div class="misc scrollable" class:dark={$isDark} transition:slide|local>
                    <Controls infos={$controls} bind:values={param.values} />
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .template {
        display: grid;
        gap: 5px;
        padding-bottom: 10px;
        padding-top: 10px;
    }

    .template:not(.column) {
        grid-auto-rows: 1fr;
        grid-auto-columns: auto;
        grid-auto-flow: row;
    }

    .template.columns {
        grid-auto-rows: auto;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
    }

    .content {
        min-height: 100px;
        border-radius: 5px 5px 5px 5px;
    }

    .misc {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        user-select: none;
    }

    .template > div > div {
        margin: 3px;
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
    .content {
        border: hsl(0, 2%, 60%) solid 1px;
        background-color: hsl(0, 0%, 100%);
    }

    .misc {
        border: hsl(0, 2%, 60%) solid 1px;
    }

    .content.dark {
        border: hsl(0, 2%, 40%) solid 1px;
        background-color: hsl(200, 4%, 14%);
    }

    .misc.dark {
        outline: hsl(0, 2%, 40%) solid 1px;
    }
</style>

<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { getParams, getCurrent, getControls } from "./context";
    import type { ParamValues } from "./context";

    import Number from "./controls/Number.svelte";
    import Text from "./controls/Text.svelte";
    import Switch from "./controls/Switch.svelte";
    import Select from "./controls/Select.svelte";

    import { slide } from "svelte/transition";

    const params = getParams();
    const current = getCurrent();
    const controls = getControls();

    type Args = $$Generic;

    export let defaults: Args;

    $: keys = Object.keys(defaults as ParamValues);

    function resolve(d: Args, p: ParamValues): Args {
        if (d === undefined) {
            return {} as Args;
        }
        const temporary = { ...d } as ParamValues;
        for (const key of keys) {
            if (key in p && p[key] !== undefined) {
                temporary[key] = p[key];
            }
        }
        return temporary as Args;
    }

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
    let rerender = false;
    beforeUpdate(() => (rerender = !rerender));
</script>

<svelte:window on:click={() => ($current = null)} />

<div class="template">
    {#each $params as { id, tag, values } (id)}
        <div
            class="instance"
            on:click|stopPropagation={() => ($current = id)}
            on:mouseenter={() => (hovered = id)}
            on:mouseleave={() => (hovered = null)}
            on:keypress={null}
        >
            {#key rerender}
                <div class="content scrollable">
                    <slot {tag} props={resolve(defaults, values)} />
                </div>
            {/key}
            {#if $controls.length > 0 && ($current === id || hovered === id)}
                <div class="misc scrollable" transition:slide>
                    <div class="controls">
                        <div class="header">Name</div>
                        <div class="header">Value</div>
                        <div class="header">In Use</div>
                        {#each $controls as info}
                            {@const type = info.type}
                            {@const name = info.name}
                            {#if type === "number"}
                                <Number {info} bind:value={values[name]} />
                            {:else if type === "text"}
                                <Text {info} bind:value={values[name]} />
                            {:else if type === "select"}
                                <Select {info} bind:value={values[name]} />
                            {:else if type === "switch"}
                                <Switch {info} bind:value={values[name]} />
                            {/if}
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .template {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-bottom: 10px;
        padding-top: 10px;
    }

    .instance {
        display: flex;
        flex-direction: column;
    }

    .content {
        padding: 10px;
        min-height: 100px;
        border-radius: 5px 5px 5px 5px;
        background-color: rgb(100, 96, 96);
    }

    .scrollable {
        width: 100%;
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    .scrollable::-webkit-scrollbar {
        display: none;
    }

    .misc {
        margin-top: 5px;
        padding: 5px;
        background-color: rgb(100, 96, 96);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        user-select: none;
    }

    .misc > .controls {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 200px 75px;
        grid-auto-rows: 1fr;
    }

    .misc > .controls > .header {
        text-align: center;
    }
</style>

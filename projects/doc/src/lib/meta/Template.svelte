<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { getProps, getStories, getActiveStory, type PropValues } from "$lib/context";
    const props = getProps();
    const stories = getStories();
    const activeStory = getActiveStory();

    type Args = $$Generic;

    export let defaults: Args;

    $: keys = Object.keys(defaults as PropValues);

    function resolve(d: Args, p: PropValues): Args {
        const temporary = { ...d } as PropValues;
        for (const key of keys) {
            if (key in p && p[key] !== undefined) {
                temporary[key] = p[key];
            }
        }
        return temporary as Args;
    }

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

<div class="block">
    {#each $stories as key (key)}
        <div class="section" on:click={() => ($activeStory = key)} on:keypress={null}>
            {#key rerender}
                <slot props={resolve(defaults, $props[key])} />
            {/key}
        </div>
    {/each}
</div>

<style>
    .block {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .section {
        background-color: rgb(100, 96, 96);
    }
</style>

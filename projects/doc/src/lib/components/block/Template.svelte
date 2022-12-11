<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { getParams, getCurrent, getControls, getDefaults } from "./context";
    import type { Params } from "./context";

    import Controls from "./controls/Controls.svelte";
    import { slide } from "svelte/transition";

    const params = getParams();
    const current = getCurrent();
    const controls = getControls();

    type Args = $$Generic;

    export let defaults: Args;

    getDefaults().set(defaults as Params);

    $: keys = Object.keys(defaults as Params);

    function resolve(d: Args, p: Params): Args {
        if (d === undefined) {
            return {} as Args;
        }
        const temporary = { ...d } as Params;
        for (const key of keys) {
            if (key in p && p[key] !== undefined) {
                temporary[key] = p[key];
            }
        }
        return temporary as Args;
    }

    let hovered: string | null = null;

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
</script>

<svelte:window on:click={() => ($current = null)} />

<div class="template">
    {#each Object.keys($params) as tag (tag)}
        <div
            class="instance"
            on:click|stopPropagation={() => ($current = tag)}
            on:mouseenter={() => (hovered = tag)}
            on:mouseleave={() => (hovered = null)}
            on:keypress={null}
        >
            {#if noreset}
                <div class="content nil-doc-scrollable">
                    <slot {tag} props={resolve(defaults, $params[tag])} />
                </div>
            {:else}
                {#key key}
                    <div class="content nil-doc-scrollable">
                        <slot {tag} props={resolve(defaults, $params[tag])} />
                    </div>
                {/key}
            {/if}
            {#if $controls.length > 0 && ($current === tag || hovered === tag)}
                <div class="misc nil-doc-scrollable" transition:slide>
                    <Controls infos={$controls} bind:values={$params[tag]} />
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    @import "../../styles/scrollable.css";

    .template {
        display: flex;
        flex-direction: column;
        font-family: "Fira Code", "Courier New", Courier, monospace;
        gap: 20px;
        padding-bottom: 10px;
        padding-top: 10px;
    }

    .instance {
        display: flex;
        flex-direction: column;
    }

    .content {
        padding: 3px;
        min-height: 100px;
        border-radius: 5px 5px 5px 5px;
        border: rgb(100, 96, 96) solid 1px;
        background-color: rgb(33, 36, 37);
    }

    .misc {
        margin-top: 2px;
        outline: rgb(100, 96, 96) solid 1px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        user-select: none;
    }
</style>

<script lang="ts">
    import { writable } from "svelte/store";

    import { createDraggable } from "./action";
    import { getTheme } from "$lib/components/context";

    const isDark = getTheme();

    // orientation of the layout
    export let vertical = false;

    // initial value where the divider is located
    export let offset = 0;

    // when secondary is enabled, main focus will be the secondary slot
    // collapsing will hide the primary slot
    export let secondary = false;

    // min distance of divider to the edges
    export let padding = 0;

    let width: number;
    let height: number;
    let collapse = false;

    const { position, draggable } = createDraggable(offset);

    function update(w: number | null, h: number | null, limit: number, value: number) {
        if (w == null || h == null || collapse) {
            return;
        }

        const span = vertical ? w : h;
        offset = Math.max(Math.min(value, span - limit), limit);
    }

    $: update(width, height, padding, $position);
    $: offsetpx = collapse ? "10px" : `${offset}px`;
    $: style = !secondary ? `auto 0px ${offsetpx}` : `${offsetpx} 0px auto`;

    const moving = writable(false);
</script>

<div
    class="container"
    class:vertical
    class:dark={$isDark}
    bind:clientHeight={height}
    bind:clientWidth={width}
    style:grid-template-columns={vertical ? style : null}
    style:grid-template-rows={!vertical ? style : null}
>
    {#if width != null && height != null}
        <div style:grid-area="primary">
            {#if !collapse || !secondary}
                <slot name="primary" />
            {/if}
        </div>
        <div class="divider" class:vertical class:moving={$moving}>
            <div
                class="overlay"
                use:draggable={{
                    reset: () => offset,
                    reversed: !secondary,
                    vertical,
                    dbltap: () => (collapse = !collapse),
                    moving
                }}
            />
        </div>
        <div style:grid-area="secondary">
            {#if !collapse || secondary}
                <slot name="secondary" />
            {/if}
        </div>
    {/if}
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-areas:
            "primary"
            "divider"
            "secondary";
        overflow: hidden;
    }

    .container.vertical {
        grid-template-areas: "primary divider secondary";
    }

    .container > div {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    /* need higher specificity than above */
    .container > .divider {
        z-index: 10;
        width: auto;
        height: 0px;
        overflow: visible;
        user-select: none;
        grid-area: divider;
    }

    .container > .divider.vertical {
        width: 0px;
        height: auto;
    }

    .container > .divider > .overlay {
        width: 100%;
        height: 20px;
        cursor: row-resize;
        transform: translateY(-50%);
        touch-action: none;
    }

    .container > .divider.vertical > .overlay {
        width: 20px;
        height: 100%;
        cursor: col-resize;
        transform: translateX(-50%);
    }

    /* colors */
    .container > .divider {
        outline: hsl(0, 2%, 70%) solid 1px;
    }

    .container > .divider.moving {
        outline: hsl(0, 0%, 0%) solid 1px;
    }

    .container.dark > .divider {
        outline: hsl(0, 2%, 38%) solid 1px;
    }

    .container.dark > .divider.moving {
        outline: hsl(0, 0%, 100%) solid 1px;
    }
</style>

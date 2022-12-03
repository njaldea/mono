<script lang="ts">
    import { createDraggable } from "./action";

    // orientation of the layout
    export let vertical = false;

    // initial value where the divider is located
    export let offset = 0;

    // which position is offset located
    // if true, the reference content is from slot="b"
    // if false, the reference content is from slot="a"
    export let reversed = false;

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
    $: style = reversed ? `auto 0px ${offsetpx}` : `${offsetpx} 0px auto`;
</script>

<div
    class="container"
    class:vertical
    bind:clientHeight={height}
    bind:clientWidth={width}
    style:grid-template-columns={vertical ? style : null}
>
    {#if width != null && height != null}
        <div style:grid-area={!reversed ? "primary" : "secondary"}>
            {#if !collapse || reversed}
                <slot name="a" />
            {/if}
        </div>
        <div class="divider" class:vertical>
            <div
                class="overlay"
                use:draggable={{ reset: () => offset, reversed, vertical }}
                on:dblclick={() => (collapse = !collapse)}
            />
        </div>
        <div style:grid-area={reversed ? "primary" : "secondary"}>
            {#if !collapse || !reversed}
                <slot name="b" />
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
        outline: rgb(100, 96, 96) solid 1px;
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
        height: 10px;
        cursor: row-resize;
        translate: translateX(-50%);
    }

    .container > .divider.vertical > .overlay {
        width: 10px;
        height: 100%;
        cursor: col-resize;
        translate: translateY(-50%);
    }
</style>

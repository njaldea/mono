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

    // size of the "draggable" divider
    export let thickness = 10;

    // min distance of divider to the edges
    export let padding = 0;

    let width: number;
    let height: number;

    const { position, draggable } = createDraggable(offset);

    function update(w: number | null, h: number | null, limit: number, value: number) {
        if (w == null || h == null) {
            return;
        }
        const span = vertical ? w : h;
        offset = Math.max(Math.min(value, span - limit), limit);
    }

    $: update(width, height, padding, $position);
    $: offsetpx = `${offset}px`;
    $: thicknesspx = `${thickness}px`;
</script>

<div
    class="root"
    bind:clientHeight={height}
    bind:clientWidth={width}
    style:flex-direction={vertical ? "row" : "column"}
>
    {#if width != null && height != null}
        <div
            class:primary={!reversed}
            class:secondary={reversed}
            style:min-height={!vertical ? `${padding}px` : null}
            style:max-height={!vertical ? `${height - padding}px` : null}
            style:min-width={vertical ? `${padding}px` : null}
            style:max-width={vertical ? `${width - padding}px` : null}
            style:width={!reversed && vertical ? offsetpx : null}
            style:height={!reversed && !vertical ? offsetpx : null}
        >
            <slot name="a" />
        </div>
        <div
            class="divider"
            style:width={vertical ? "0px" : null}
            style:height={!vertical ? "0px" : null}
        >
            <div
                class="overlay"
                style:width={vertical ? thicknesspx : "100%"}
                style:height={!vertical ? thicknesspx : "100%"}
                style:cursor={vertical ? "col-resize" : "row-resize"}
                style:transform={vertical ? "translateX(-50%)" : "translateY(-50%)"}
                use:draggable={{ reset: () => offset, reversed, vertical }}
            />
        </div>
        <div
            class:primary={reversed}
            class:secondary={!reversed}
            style:min-height={!vertical ? `${padding}px` : null}
            style:max-height={!vertical ? `${height - padding}px` : null}
            style:min-width={vertical ? `${padding}px` : null}
            style:max-width={vertical ? `${width - padding}px` : null}
            style:width={reversed && vertical ? offsetpx : null}
            style:height={reversed && !vertical ? offsetpx : null}
        >
            <slot name="b" />
        </div>
    {/if}
</div>

<style>
    .root {
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .primary {
        flex-shrink: 0;
    }

    .secondary {
        flex-grow: 1;
        flex-basis: auto;
    }

    .divider {
        z-index: 1;
        user-select: none;
    }

    .root > div {
        outline: rgb(100, 96, 96) solid 1px;
    }
</style>

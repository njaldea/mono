<script lang="ts">
    import { writable } from "svelte/store";
    import { tweened } from "svelte/motion";

    import { createDraggable } from "./action";

    // orientation of the layout
    export let vertical = false;

    // initial value where the divider is located
    export let offset = 0;

    // when b is enabled, main content will be slot "b"
    // collapsing will show only the main content
    export let b = false;

    let width: number;
    let height: number;

    const { position, draggable } = createDraggable(offset);

    $: span = vertical ? width : height;

    const update = (limit: number, value: number) => {
        if (null == span) {
            return;
        }

        offset = Math.max(Math.min(value, span - limit), limit);
    };

    const off = tweened(offset, { duration: 50 });
    const min = 4;
    let last: number[] = [];

    $: update(min, $position);
    $: $off = offset;
    $: style = !b ? `auto 0.2rem ${$off}px` : `${$off}px 0.2rem auto`;

    const moving = writable(false);

    const addLast = (v: number) => {
        if (v > min) {
            if (last.length < 2) {
                last = [...last, v];
            } else {
                last = [last[1], v];
            }
        }
    };

    const dbltap = () => {
        if ($off > min) {
            addLast(offset);
            offset = min;
        } else if (last.length > 0) {
            offset = last.pop() as number;
        }
    };

    const check = (v: number, flag: boolean, s: number) => {
        if (flag) {
            return v < s - min;
        } else {
            return v > min;
        }
    };
</script>

<div
    class="container"
    class:b
    class:a={!b}
    class:vertical
    class:horizontal={!vertical}
    class:moving={$moving}
    bind:clientWidth={width}
    bind:clientHeight={height}
    style:grid-template-columns={vertical ? style : null}
    style:grid-template-rows={!vertical ? style : null}
>
    {#if width != null && height != null}
        <div style:grid-area="A">
            {#if check($off, !b, span)}
                <slot name="A" />
            {/if}
        </div>
        <div class="divider">
            <div
                class="overlay"
                title={`Collapse ${vertical ? (b ? "left" : "right") : b ? "top" : "bottom"}`}
                use:draggable={{
                    reset: () => offset,
                    reversed: !b,
                    vertical,
                    dbltap: dbltap,
                    tap: () => addLast($off),
                    moving
                }}
            />
        </div>
        <div style:grid-area="B">
            {#if check($off, b, span)}
                <slot name="B" />
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
            "A"
            "divider"
            "B";
        overflow: hidden;
    }

    .container.vertical {
        grid-template-areas: "A divider B";
    }

    .container > div {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .container > .divider {
        z-index: 10;
        overflow: visible;
        user-select: none;
        grid-area: divider;
    }

    .overlay {
        touch-action: none;
    }

    .container > .divider > .overlay {
        width: 100%;
        height: 1.5rem;
        cursor: ns-resize;
        transform: translateY(-50%);
    }

    .container.vertical > .divider > .overlay {
        width: 1.5rem;
        height: 100%;
        cursor: ew-resize;
        transform: translateX(-50%);
    }

    /* colors */
    .divider {
        transition: border-color var(--i-nil-doc-transition-time),
            background-color var(--i-nil-doc-transition-time);
        --width: 0.0625rem;
    }

    .container.horizontal > .divider {
        border-bottom: var(--i-nil-doc-container-p) solid var(--width);
        border-top: var(--i-nil-doc-container-p) solid var(--width);
        background-color: var(--i-nil-doc-container-p);
    }

    .container.vertical > .divider {
        border-right: var(--i-nil-doc-container-p) solid var(--width);
        border-left: var(--i-nil-doc-container-p) solid var(--width);
        background-color: var(--i-nil-doc-container-p);
    }

    .container.a.horizontal > .divider:hover,
    .container.moving.a.horizontal > .divider {
        border-bottom: var(--i-nil-doc-container-s) solid var(--width);
    }

    .container.b.horizontal > .divider:hover,
    .container.moving.b.horizontal > .divider {
        border-top: var(--i-nil-doc-container-s) solid var(--width);
    }

    .container.a.vertical > .divider:hover,
    .container.moving.a.vertical > .divider {
        border-right: var(--i-nil-doc-container-s) solid var(--width);
    }

    .container.vertical.b > .divider:hover,
    .container.moving.vertical.b > .divider {
        border-left: var(--i-nil-doc-container-s) solid var(--width);
    }
</style>

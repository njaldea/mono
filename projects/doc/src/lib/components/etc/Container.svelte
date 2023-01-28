<script lang="ts">
    import { writable } from "svelte/store";
    import { tweened } from "svelte/motion";

    import { createDraggable } from "./action";
    import { getTheme } from "../context";

    const dark = getTheme();

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
    let last: number[] = [];

    $: update(10, $position);
    $: $off = offset;
    $: style = !b ? `auto 5px ${$off}px` : `${$off}px 5px auto`;

    const moving = writable(false);

    const addLast = (v: number) => {
        if (v > 10) {
            if (last.length < 2) {
                last = [...last, v];
            } else {
                last = [last[1], v];
            }
        }
    };

    const dbltap = () => {
        if ($off > 10) {
            addLast(offset);
            offset = 10;
        } else if (last.length > 0) {
            offset = last.pop() as number;
        }
    };

    const check = (v: number, flag: boolean, s: number) => {
        if (flag) {
            return v < s - 10;
        } else {
            return v > 10;
        }
    };
</script>

<div
    class="container"
    class:vertical
    class:b
    class:dark={$dark}
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
    div {
        box-sizing: border-box;
    }

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
        height: 20px;
        cursor: ns-resize;
        transform: translateY(-50%);
    }

    .container.vertical > .divider > .overlay {
        width: 20px;
        height: 100%;
        cursor: ew-resize;
        transform: translateX(-50%);
    }

    /* colors */
    .container {
        --color-p: hsl(0, 2%, 70%);
        --color-s: hsl(0, 0%, 0%);
    }

    .container.dark {
        --color-p: hsl(0, 2%, 40%);
        --color-s: hsl(0, 0%, 100%);
    }

    .divider {
        transition: border-color 350ms, background-color 350ms;
    }

    .container:not(.vertical) > .divider {
        border-bottom: var(--color-p) solid 2.5px;
        border-top: var(--color-p) solid 2.5px;
        background-color: var(--color-p);
    }

    .container.vertical > .divider {
        border-right: var(--color-p) solid 2.5px;
        border-left: var(--color-p) solid 2.5px;
        background-color: var(--color-p);
    }

    .container:not(.b):not(.vertical) > .divider:hover,
    .container.moving:not(.b):not(.vertical) > .divider {
        border-bottom: var(--color-s) solid 2.5px;
    }

    .container.b:not(.vertical) > .divider:hover,
    .container.moving.b:not(.vertical) > .divider {
        border-top: var(--color-s) solid 2.5px;
    }

    .container:not(.b).vertical > .divider:hover,
    .container.moving:not(.b).vertical > .divider {
        border-right: var(--color-s) solid 2.5px;
    }

    .container.vertical.b > .divider:hover,
    .container.moving.vertical.b > .divider {
        border-left: var(--color-s) solid 2.5px;
    }
</style>

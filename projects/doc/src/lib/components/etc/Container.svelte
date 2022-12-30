<script lang="ts">
    import { writable } from "svelte/store";
    import { tweened } from "svelte/motion";

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
    $: style = !secondary ? `auto 5px ${$off}px` : `${$off}px 5px auto`;

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
    class:secondary
    class:dark={$isDark}
    class:moving={$moving}
    bind:clientWidth={width}
    bind:clientHeight={height}
    style:grid-template-columns={vertical ? style : null}
    style:grid-template-rows={!vertical ? style : null}
>
    {#if width != null && height != null}
        <div style:grid-area="primary">
            {#if check($off, !secondary, span)}
                <slot name="primary" />
            {/if}
        </div>
        <div class="divider">
            <div
                class="overlay"
                use:draggable={{
                    reset: () => offset,
                    reversed: !secondary,
                    vertical,
                    dbltap: dbltap,
                    tap: () => addLast($off),
                    moving
                }}
            />
        </div>
        <div style:grid-area="secondary">
            {#if check($off, secondary, span)}
                <slot name="secondary" />
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

    .container.moving:not(.secondary):not(.vertical) > .divider {
        border-bottom: var(--color-s) solid 2.5px;
    }

    .container.moving.secondary:not(.vertical) > .divider {
        border-top: var(--color-s) solid 2.5px;
    }

    .container.moving:not(.secondary).vertical > .divider {
        border-right: var(--color-s) solid 2.5px;
    }

    .container.moving.vertical.secondary > .divider {
        border-left: var(--color-s) solid 2.5px;
    }
</style>

<script lang="ts">
    import { writable } from "svelte/store";
    import { Tween } from "svelte/motion";

    import { createDraggable } from "./action";
    import type { Snippet } from "svelte";

    let {
        vertical = false,
        offset = $bindable(4),
        b = false,
        persistent = false,
        side_a,
        side_b
    }: {
        vertical?: boolean;
        offset?: number;
        b?: boolean;
        persistent?: boolean;
        side_a: Snippet;
        side_b: Snippet;
    } = $props();

    let width: number | null = $state(null);
    let height: number | null = $state(null);

    const { position, draggable } = createDraggable(offset);

    let span = $derived(vertical ? width : height);

    const update = (limit: number, value: number) => {
        if (null == span) {
            return;
        }

        offset = Math.max(Math.min(value, span - limit), limit);
    };

    const off = new Tween(offset, { duration: 50 });
    const min = 4;
    let last: number[] = [];

    $effect(() => update(min, $position));
    $effect(() => {
        off.set(offset);
    });
    let style = $derived(!b ? `auto 0.2rem ${off.current}px` : `${off.current}px 0.2rem auto`);

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
        if (off.current > min) {
            addLast(offset);
            offset = min;
        } else if (last.length > 0) {
            // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
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
    const title = (v: boolean, b: boolean) => {
        if (v) {
            return b ? "left" : "right";
        }
        return b ? "top" : "bottom";
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
            {#if persistent || check(off.current, !b, span ?? 0)}
                {@render side_a()}
            {/if}
        </div>
        <div class="divider">
            <div
                class="overlay"
                title={`Collapse ${title(vertical, b)}`}
                use:draggable={{
                    reset: () => offset,
                    reversed: !b,
                    vertical,
                    dbltap: dbltap,
                    tap: () => addLast(off.current),
                    moving
                }}
            ></div>
        </div>
        <div style:grid-area="B">
            {#if persistent || check(off.current, b, span ?? 0)}
                {@render side_b()}
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
        transition:
            border-color var(--i-nil-doc-transition-time),
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

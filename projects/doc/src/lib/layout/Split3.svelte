<script lang="ts">
    import { fromStore } from "svelte/store";
    import { Tween } from "svelte/motion";
    import { createDraggable2 } from "./action";
    import { untrack, type Snippet } from "svelte";
    import Scrollable from "./Scrollable.svelte";

    let {
        side_a_width = $bindable(300),
        side_c_width = $bindable(300),
        side_b_min_width = 100,
        side_a,
        side_b,
        side_c,
    }: {
        side_a_width: number;
        side_c_width: number;
        side_b_min_width?: number;
        side_a: Snippet;
        side_b: Snippet;
        side_c: Snippet;
    } = $props();

    let width: number | null = $state(null);
    let height: number | null = $state(null);

    let template_columns = $state("");
    let moving = $state([false, false]) as boolean[];
    
    let last_a: number | null = null;
    let last_c: number | null = null;

    const DIVIDER_WIDTH = 1;
    const COLLAPSE_THRESHOLD = 5;
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));
    const maxLeft = (w: number, c: number) => w - c - side_b_min_width - DIVIDER_WIDTH;
    const maxRight = (w: number, a: number) => w - a - side_b_min_width - DIVIDER_WIDTH;
    const setA = (v: number) => {
        side_a_width = Math.max(0, v);
        tween_a.set(side_a_width);
    };
    const setC = (v: number) => {
        side_c_width = Math.max(0, v);
        tween_c.set(side_c_width);
    };

    const tween_a = new Tween(side_a_width, { duration: 50 });
    const tween_c = new Tween(side_c_width, { duration: 50 });

    $effect(() => void tween_a.set(side_a_width));
    $effect(() => void tween_c.set(side_c_width));

    const divider_a = createDraggable2();
    const divider_a_m = fromStore(divider_a.engaged);
    const divider_a_p = fromStore(divider_a.position);
 
    $effect(() => {
        divider_a_m.current;
        untrack(() => { moving[0] = divider_a_m.current; });
    });

    $effect(() => {
        divider_a_p.current;
        return () => { 
            untrack(() => {
                const w = width ?? 0;
                const clamped = Math.min(divider_a_p.current, maxLeft(w, side_c_width));
                setA(clamped);
            }); 
        }
    });

    const divider_c = createDraggable2();
    const divider_c_m = fromStore(divider_c.engaged);
    const divider_c_p = fromStore(divider_c.position);

    $effect(() => {
        divider_c_m.current;
        untrack(() => { moving[1] = divider_c_m.current; });
    });

    $effect(() => {
        divider_c_p.current;
        return () => { 
            untrack(() => { 
                // divider_c position is inverse of right-side width
                const w = width ?? 0;
                const maxR = maxRight(w, side_a_width);
                const clamped = clamp(divider_c_p.current, 0, maxR);
                setC(maxR - clamped);
            }); 
        }
    });

    const dbltap_a = () => {
        if (side_a_width > COLLAPSE_THRESHOLD) {
            last_a = side_a_width;
            setA(0);
        } else if (last_a !== null) {
            const w = width ?? 0;
            const target = Math.max(0, last_a);
            const maxLeftWithCurrentC = maxLeft(w, side_c_width);

            if (target <= maxLeftWithCurrentC) {
                setA(target);
            } else {
                const movedC = Math.max(0, maxRight(w, target));
                setC(movedC);
                setA(target);
            }
            last_a = null;
        }
    };

    const tap_a = () => {
        if (last_a == null) {
            last_a = side_a_width;
        }
    };

    const dbltap_c = () => {
        if (side_c_width > COLLAPSE_THRESHOLD) {
            last_c = side_c_width;
            setC(0);
        } else if (last_c !== null) {
            const w = width ?? 0;
            const target = Math.max(0, last_c);
            const maxRightWithCurrentA = maxRight(w, side_a_width);

            if (target <= maxRightWithCurrentA) {
                setC(target);
            } else {
                const movedA = Math.max(0, maxLeft(w, target));
                setA(movedA);
                setC(target);
            }
            last_c = null;
        }
    };

    const tap_c = () => {
        if (last_c == null) {
            last_c = side_c_width;
        }
    };

    // Update template columns style
    $effect(() => {
        tween_a.current;
        tween_c.current;
        untrack(() => {
            template_columns = `${tween_a.current}px 1px 1fr 1px ${tween_c.current}px`;
        });
    });
</script>

<div class="posabs">
    <div
        class="container"
        bind:clientWidth={width}
        bind:clientHeight={height}
        style:grid-template-columns={template_columns}
    >
        {#if width != null && height != null}
            <Scrollable>
                {@render side_a()}
            </Scrollable>
            <div class="divider divider-a" class:moving={moving[0]}>
                <div
                    class="overlay"
                    use:divider_a.draggable={{
                        reset: () => Math.max(0, $state.snapshot(side_a_width) - DIVIDER_WIDTH),
                        reversed: false,
                        vertical: true,
                        dbltap: dbltap_a,
                        tap: tap_a
                    }}
                ></div>
            </div>
            <Scrollable>
                {@render side_b()}
            </Scrollable>
            <div class="divider divider-c" class:moving={moving[1]}>
                <div
                    class="overlay"
                    use:divider_c.draggable={{
                        reset: () => {
                            const w = $state.snapshot(width) ?? 0;
                            const maxR = maxRight(w, $state.snapshot(side_a_width));
                            return Math.max(0, maxR - $state.snapshot(side_c_width));
                        },
                        reversed: false,
                        vertical: true,
                        dbltap: dbltap_c,
                        tap: tap_c
                    }}
                ></div>
            </div>
            <Scrollable>
                {@render side_c()}
            </Scrollable>
        {/if}
    </div>
</div>

<style>
    .posabs {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .container {
        position: absolute;
        width: 100%;
        height: 100%;
        display: grid;
        overflow: hidden;
        outline: solid red 1px;
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
    }

    .overlay {
        touch-action: none;
    }

    .container > .divider > .overlay {
        height: 100%;
        width: 1.5rem;
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

    .container > .divider {
        border-left: var(--i-nil-doc-container-p) solid var(--width);
        border-right: var(--i-nil-doc-container-p) solid var(--width);
        background-color: var(--i-nil-doc-container-p);
    }

    /* Hover highlight for three-way split */
    .divider-a:hover,
    .divider-a.moving {
        border-left: var(--i-nil-doc-container-s) solid var(--width);
    }

    .divider-c:hover,
    .divider-c.moving {
        border-right: var(--i-nil-doc-container-s) solid var(--width);
    }
</style>

<script lang="ts">
    import { fromStore } from "svelte/store";
    import { createDraggable2 } from "./action";
    import { untrack, type Snippet } from "svelte";
    import Scrollable from "./Scrollable.svelte";

    let {
        widths = $bindable(),
        snippets = [],
    }: {
        widths: (number | null)[];
        snippets: Snippet[];
    } = $props();

    let width: number | null = $state(null);
    let height: number | null = $state(null);

    let column_count = $derived(widths.every(v=> v !== null) ? widths.length : 0);
    let template_columns = $state("");

    let moving = $state([]) as boolean[];
    let actions = $state([]) as ReturnType<typeof createDraggable2>[];

    $effect(() => {
        width;
        untrack(() => {
            if (width != null) {
                if (widths.some(v => v == null)) {
                    let count = 0;
                    let remaining = width;

                    for (const v of widths) {
                        if (v == null) {
                            count = count + 1;
                        } else {
                            remaining -= v;
                        }
                    };

                    remaining -= widths.length - 1;

                    const rest = Math.max(remaining / count, 0);
                    widths = widths.map(v => v == null ? rest : v);
                } else {
                    let remaining = width;
                    for (let i = 0; i < widths.length - 1; ++i)
                    {
                        remaining -= widths[i] ?? 0;
                    }

                    widths[widths.length - 1] = remaining - (widths.length - 1);
                    widths = [...widths];
                }
            }
        });
    });

    $effect(() => {
        widths;
        untrack(() => {
            if (widths.some(v => v == null)) {
                return;
            }

            let template = [];
            for (let i = 0; i < widths.length; ++i)
            {
                if (i > 0) {
                    template.push("1px");
                }
                template.push(`${widths[i]}px`);
            }
            template_columns = template.join(" ");
        });
    });

    $effect(() => {
        column_count;
        untrack(() => {
            moving = [];
            actions = [];

            if (widths.some(v => v == null)) {
                return;
            }

            for (let i = 1; i < column_count; ++i) {
                const draggable = createDraggable2();
                const m = fromStore(draggable.engaged);
                const p = fromStore(draggable.position);

                $effect(() => {
                    m.current;
                    console.log(p.current);
                    untrack(() => { moving[i] = m.current; });
                });

                $effect(() => {
                    p.current;
                    return () => {
                        untrack(() => {
                            const delta = p.current - (widths[i - 1] ?? 0);
                            widths[i - 1] = p.current;
                            widths[i] = (widths[i] ?? 0) - delta;
                            widths= [...widths];
                        });
                    }
                });

                actions.push(draggable);
            }
        });
    });
</script>

<div class="posabs">
    <div
        class="container"
        class:moving={moving}
        bind:clientWidth={width}
        bind:clientHeight={height}
        style:grid-template-columns={template_columns}
    >
        {#if width != null && height != null && column_count > 0 && snippets.length - 1 === actions.length}
            {#each { length: snippets.length } as _, i}
                <Scrollable>
                    {@render snippets[i]()}
                </Scrollable>
                {#if i < actions.length}
                    {@const action = actions[i]}
                    <div class="divider">
                        <div
                            class="overlay"
                            use:action.draggable={{
                                reset: () => Math.max(0, ($state.snapshot(widths[i]) ?? 0) - 1),
                                reversed: false,
                                vertical: true,
                                dbltap: () => { console.log("double tap"); },
                                tap: () => { console.log("tap"); }
                            }}
                        ></div>
                    </div>
                {/if}
            {/each}
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
        border-bottom: var(--i-nil-doc-container-p) solid var(--width);
        border-top: var(--i-nil-doc-container-p) solid var(--width);
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

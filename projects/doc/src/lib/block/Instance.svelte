<script lang="ts" generics="Args">
    import { onDestroy, tick, type Snippet } from "svelte";
    import { writable } from "svelte/store";

    import { resolve } from "./utils";
    import { getControls, getControlInfo, getControlValue, type ControlValue } from "./context";

    const controls = getControls();
    const cc = getControlInfo();
    const vv = getControlValue();

    let {
        defaults,
        noreset = false,
        children
    }: {
        defaults?: Args;
        noreset?: boolean;
        children?: Snippet<
            [
                {
                    values: Args;
                    events: Record<string, (ev?: any) => void>;
                    key: boolean;
                }
            ]
        >;
    } = $props();

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
    let key = $state(false);
    $effect(() => {
        key;
        return () => {
            key = !key;
        };
    });

    const s_values = writable<ControlValue>({ props: {}, events: [] });

    // Need to hide bound from svelte reactivity logic since bound variable is also modified by the control bindings
    // eslint-disable-next-line
    const updateBound = (d: Args | undefined) => ($s_values.props = resolve(d ?? {}, {}));
    $effect(() => {
        updateBound(defaults);
    });

    const focus = async () => {
        if ($vv !== s_values) {
            $vv = null;
            await tick();
            $cc = controls;
            $vv = s_values;
        }
    };
    const unfocus = () => {
        if ($vv === s_values) {
            $cc = null;
            $vv = null;
        }
    };
    onDestroy(unfocus);

    const populate = (ext: string[] | null): Record<string, (ev: CustomEvent<unknown>) => void> => {
        const obj: Record<string, (ev: CustomEvent<unknown>) => void> = {};
        const stringify = (detail: unknown) => {
            if (detail) {
                if ("string" === typeof detail) {
                    return detail;
                }
                return JSON.stringify(detail);
            }
            return "";
        };
        if (null != ext) {
            for (const name of ext) {
                obj[name] = (param) => {
                    const detail = stringify(param);
                    if ($s_values.events.length > 0) {
                        const last = $s_values.events[0];
                        if (last.name === name && last.detail === detail && last.count < 99) {
                            last.count += 1;
                            $s_values.events = $s_values.events;
                            return;
                        }
                    }
                    $s_values.events.unshift({ name, detail, count: 1 });
                    if ($s_values.events.length > 50) {
                        $s_values.events.pop();
                    }
                    $s_values.events = $s_values.events;
                };
            }
        }
        return obj;
    };

    let values = $state(resolve<Args>(defaults ?? {}, $s_values.props));
    let events = $state(populate($controls.events));

    const unsubs: (() => void)[] = [];
    unsubs.push(s_values.subscribe((v) => (values = resolve<Args>(defaults ?? {}, v.props))));
    unsubs.push(controls.subscribe((v) => (events = populate(v.events))));

    onDestroy(() => unsubs.forEach((v) => v()));
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/3-Block/1-Content/1-Instance) for more details.
-->

<div
    class="instance"
    class:selected={$vv === s_values}
    class:controls={$controls.events.length > 0 || $controls.props.length > 0}
    role="none"
    onclick={focus}
    onkeypress={null}
>
    <div class="content">
        {#if children}
            {#if noreset}
                {@render children({ values, events, key })}
            {:else}
                {#key key}
                    {@render children({ values, events, key })}
                {/key}
            {/if}
        {/if}
    </div>
</div>

<style>
    .instance {
        width: 100%;
        height: 100%;
    }

    .content {
        min-height: 6.25rem;
        border: 1px solid var(--i-nil-doc-block-outline-color);
    }

    /* colors */
    .instance {
        transition: background-color var(--i-nil-doc-transition-time);
        color: var(--i-nil-doc-color);
        background-color: var(--i-nil-doc-bg-color);
        border-width: 2px;
        border-style: solid;
        border-color: transparent;
        box-sizing: border-box;
    }

    .instance:hover {
        border-color: var(--i-nil-doc-instance-hovered);
    }

    .instance.controls:hover {
        border-color: var(--i-nil-doc-instance-control-hovered);
    }

    .instance.selected,
    .instance.selected:hover {
        border-color: var(--i-nil-doc-instance-selected-color);
    }
</style>

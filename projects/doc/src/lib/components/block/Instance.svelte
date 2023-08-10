<script lang="ts">
    import { beforeUpdate, onDestroy } from "svelte";
    import { writable } from "svelte/store";

    import { resolve } from "./utils";
    import { getControls, getControlInfo, getControlValue, type ControlValue } from "./context";

    const controls = getControls();
    const cc = getControlInfo();
    const vv = getControlValue();

    // eslint-disable-next-line no-undef
    type PropArgs = $$Generic;

    // eslint-disable-next-line
    export let defaults: PropArgs | undefined = undefined;
    export let noreset = false;

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
    let key = false;
    beforeUpdate(() => (key = !key));

    const values = writable<ControlValue>({ props: {}, events: [] });

    // Need to hide bound from svelte reactivity logic since bound variable is also modified by the control bindings
    // eslint-disable-next-line
    const updateBound = (d: PropArgs | undefined) => ($values.props = resolve(d ?? {}, {}));
    $: updateBound(defaults);

    const focus = () => {
        if ($vv !== values) {
            $cc = controls;
            $vv = values;
        }
    };
    const unfocus = () => {
        if ($vv === values) {
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
                obj[name] = (ev) => {
                    const detail = stringify(ev.detail);
                    if ($values.events.length > 0) {
                        const last = $values.events[0];
                        if (last.name === name && last.detail === detail && last.count < 99) {
                            last.count += 1;
                            $values.events = $values.events;
                            return;
                        }
                    }
                    $values.events.unshift({ name, detail, count: 1 });
                    if ($values.events.length > 50) {
                        $values.events.pop();
                    }
                    $values.events = $values.events;
                };
            }
        }
        return obj;
    };

    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
    $: props = resolve<PropArgs>(defaults ?? {}, $values.props);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    $: events = populate($controls.events);
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/3-Block/1-Content/1-Instance) for more details.
-->

<div
    class="instance"
    class:selected={$vv === values}
    class:controls={$controls.events.length > 0 || $controls.props.length > 0}
    role="none"
    on:click={focus}
    on:keypress={null}
>
    <div class="content">
        {#if noreset}
            <slot {props} {events} {key} />
        {:else}
            {#key key}
                <slot {props} {events} {key} />
            {/key}
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

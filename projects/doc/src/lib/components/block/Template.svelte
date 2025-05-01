<script lang="ts" module>
    import type { ValueType } from "./types";
</script>

<script lang="ts" generics="Args">
    import { getDefaults, getParams, getOrientation } from "./context";
    import { resolve } from "./utils";

    import Instance from "./Instance.svelte";

    import { type Snippet } from "svelte";

    const params = getParams();
    const defaultsStore = getDefaults();
    const orientation = getOrientation();

    let {
        defaults,
        noreset = false,
        columns = false,
        children: cc
    }: {
        defaults?: Args;
        noreset?: boolean;
        columns?: boolean;
        children?: Snippet<[{
            id: number;
            tag: string;
            values: Args;
            events: Record<string, (ev?: any) => void>;
            key: boolean;
        }]>;
    } = $props();

    $effect(() => { defaultsStore?.set(defaults ?? {} as any); });
    $effect(() => { orientation.set(columns); });

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
        return () => { key = !key; }
    });

    const resolveArgs = resolve<Args>;
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/3-Block/1-Content/2-Template) for more details.
-->

{#each $params as param (param.id)}
    <Instance
        defaults={resolveArgs($defaultsStore, param.values)}
        {noreset}
    >
        {#snippet children({ values, events, key })}
            {@render cc?.({
                id: param.id,
                tag: param.tag,
                values: values,
                events: events,
                key: key
            })}
        {/snippet}
    </Instance>
{/each}

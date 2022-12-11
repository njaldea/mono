<script lang="ts">
    import { onMount } from "svelte";

    import { getParams, getDefaults, type ValueType } from "./context";
    import { resolve } from "./utils";

    export let tag: string | undefined = undefined;
    export let props: Record<string, ValueType> = {};

    const defaults = getDefaults();
    const params = getParams();

    onMount(() =>
        defaults.subscribe((d) => {
            if (d != null) {
                params.update((p) => [
                    ...p,
                    {
                        id: p.length,
                        tag: tag ?? `${p.length}`,
                        values: resolve(d, props),
                        defaults: resolve(d, props)
                    }
                ]);
            }
        })
    );
</script>

<script lang="ts">
    import { onMount } from "svelte";

    import { getParams, getDefaults } from "./context";
    import { resolve } from "./utils";

    export let tag: string;
    export let props: Record<string, unknown> = {};

    const defaults = getDefaults();
    const params = getParams();

    onMount(() =>
        defaults.subscribe((d) => {
            if (d != null) {
                params.update((p) => {
                    const v = [
                        ...p,
                        {
                            id: p.length,
                            tag,
                            values: resolve(d, props),
                            defaults: resolve(d, props)
                        }
                    ];
                    console.log(v);
                    return v;
                });
            }
        })
    );
</script>

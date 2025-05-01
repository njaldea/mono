<script lang="ts">
    import type { ValueType } from "./types";
    import { getParams } from "./context";
    import { resolve } from "./utils";

    import { get } from "svelte/store";

    let {
        tag,
        props = {}
    }: {
        tag?: string | undefined;
        props?: Record<string, ValueType>;
    } = $props();

    const params = getParams();

    const id = get(params).length;
    params.update(p => {
        p.push({
            id,
            tag: `${id}`,
            values: {}
        });
        return p;
    });

    $effect(() => params.update(p => { p[id].tag = tag ?? `${id}`; return p; }));
    $effect(() => params.update(p => { p[id].values = resolve(props, {}); return p; }));
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/3-Block/1-Content/2-Template/1-Params) for more details.
-->

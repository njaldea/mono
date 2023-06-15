<script lang="ts">
    import type { ValueType } from "./types";
    import { getParams } from "./context";
    import { resolve } from "./utils";

    export let tag: string | undefined = undefined;
    export let props: Record<string, ValueType> = {};

    const params = getParams();

    const id = $params.length;
    $params.push({
        id,
        tag: `${id}`,
        values: {}
    });

    $: $params[id].tag = tag ?? `${id}`;
    $: $params[id].values = resolve(props, {});
</script>

<!--
    @component
    See [documentation](https://mono-doc.vercel.app/3-Components/3-Block/1-Content/2-Template/1-Params) for more details.
-->

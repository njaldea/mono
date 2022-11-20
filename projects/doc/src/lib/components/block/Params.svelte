<script lang="ts">
    import { getParams } from "./context";
    export let tag: string;
    export let props: Record<string, unknown> = {};

    getParams().update((v) => [...v, { id: v.length, tag, values: props }]);
</script>

<script lang="ts">
    import { getParams, getDefaults } from "./context";
    export let tag: string;
    export let props: Record<string, unknown> = {};

    const defaults = getDefaults();
    const params = getParams();

    function set(tag: string, props: Record<string, unknown>) {
        if ($defaults != null) {
            $params[tag] = { ...$defaults, ...props };
        }
    }

    $: set(tag, props);
</script>

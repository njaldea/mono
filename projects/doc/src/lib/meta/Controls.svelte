<script lang="ts">
    import type { Props, Events } from "$lib/types/controls";
    import { getControlProps, getControlEvents } from "$lib/context";

    export let props: Props = [];
    export let events: Events = [];

    getControlProps().set(props);
    getControlEvents().set(events);
</script>

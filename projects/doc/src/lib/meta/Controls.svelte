<script lang="ts">
    import type { Props, Events } from '$lib/types/controls';
    import { getControls } from '$lib/context';

    export let props: Props = [];
    export let events: Events = [];

    getControls().set({ props, events });
</script>

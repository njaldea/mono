<script lang="ts">
    import type { Props, Events } from '$lib/types/controls';
    import { setControls } from '$lib/context';

    export let props: Props = [];
    export let events: Events = [];

    setControls({ props, events });
</script>

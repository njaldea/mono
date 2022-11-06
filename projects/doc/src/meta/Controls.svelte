<script lang="ts">
    import type { Props, Events } from '../layout/content';

    import { setControls } from '../context';

    export let props: Props = [];
    export let events: Events = [];

    setControls({ props, events });
</script>

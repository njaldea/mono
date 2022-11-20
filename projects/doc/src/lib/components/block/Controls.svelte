<script lang="ts">
    import type { Control } from "./controls/types";
    import { getControls } from "./context";

    export let props: Control[] = [];

    getControls().set(props);
</script>

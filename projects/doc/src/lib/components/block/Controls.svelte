<script lang="ts">
    import type { Control } from "./types";
    import { getControls } from "./_impl/context";

    export let props: Control[] = [];

    getControls().set(props);
</script>

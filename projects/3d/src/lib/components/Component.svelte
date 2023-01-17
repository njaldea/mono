<script lang="ts">
    import { getCore } from "$lib/core/context/core";
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { afterUpdate } from "svelte";

    const core = getCore();
    const render = () => core.render();
    afterUpdate(render);
    destructor(render);
</script>

<slot />

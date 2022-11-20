<script lang="ts">
    import { getCore } from "$lib/core/context/core";
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { afterUpdate } from "svelte";

    const { render } = getCore();
    render();
    afterUpdate(render);
    destructor(render);
</script>

<slot />

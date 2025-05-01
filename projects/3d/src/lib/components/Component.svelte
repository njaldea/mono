<script lang="ts">
    // import { getCore } from "$lib/core/context/core";
    // not needed if we'll run the loop anyway
    // import { destructor } from "$lib/core/lifecycle/destructor";
    import type { Snippet } from "svelte";

    // const core = getCore();
    // const render = () => core.render();
    // $effect(render); // does not work. need afterupdate
    // destructor(render);

    let { children }: { children?: Snippet } = $props();
</script>

{@render children?.()}

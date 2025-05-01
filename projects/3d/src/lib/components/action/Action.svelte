<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentMesh } from "$lib/core/context/mesh";
    import { getCore } from "$lib/core/context/core";

    import { ActionManager } from "@babylonjs/core/Actions/actionManager.js";

    let { children } = $props();

    const { scene } = getCore();
    const mesh = getCurrentMesh();

    const action = new ActionManager(scene);
    if (mesh) {
        mesh.actionManager = action;
    }

    destructor(() => {
        if (mesh) {
            mesh.actionManager = null;
        }
        action.dispose();
    });
</script>

{@render children?.()}

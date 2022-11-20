<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentMesh } from "$lib/core/context/mesh";
    import { getCore } from "$lib/core/context/core";

    import { ActionManager } from "@babylonjs/core/Actions/actionManager.js";

    const { scene } = getCore();
    const mesh = getCurrentMesh();

    const action = new ActionManager(scene);
    mesh.actionManager = action;

    destructor(() => {
        mesh.actionManager = null;
        action.dispose();
    });
</script>

<slot />

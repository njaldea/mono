<script lang="ts" context="module">
    import "@babylonjs/core/Culling/ray.js";
    import { ray } from "$lib/core/state/treeshake";
    ray.set(true);
</script>

<script lang="ts">
    import Component from "$lib/components/Component.svelte";
    import { getCurrentMesh } from "$lib/core/context/mesh";
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { ActionManager } from "@babylonjs/core/Actions/actionManager.js";
    import { ExecuteCodeAction } from "@babylonjs/core/Actions/directActions.js";

    const mesh = getCurrentMesh();

    let hovered = false;

    if (null == mesh?.actionManager) {
        throw "Hover component should be a child of an Action component";
    }

    const actionIn = new ExecuteCodeAction(
        ActionManager.OnPointerOverTrigger,
        () => (hovered = true)
    );
    const actionOut = new ExecuteCodeAction(
        ActionManager.OnPointerOutTrigger,
        () => (hovered = false)
    );

    mesh.actionManager.registerAction(actionIn);
    mesh.actionManager.registerAction(actionOut);

    destructor(() => {
        if (null != mesh.actionManager) {
            mesh.actionManager.unregisterAction(actionIn);
            mesh.actionManager.unregisterAction(actionOut);
        }
    });
</script>

{#if hovered}
    <Component>
        <slot />
    </Component>
{/if}

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

    const { actionManager } = getCurrentMesh();

    let hovered = false;

    if (null == actionManager) {
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

    actionManager.registerAction(actionIn);
    actionManager.registerAction(actionOut);

    destructor(() => {
        actionManager.unregisterAction(actionIn);
        actionManager.unregisterAction(actionOut);
    });
</script>

{#if hovered}
    <Component>
        <slot />
    </Component>
{/if}

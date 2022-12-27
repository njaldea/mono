<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentMesh } from "$lib/core/context/mesh";

    import type { Material } from "@babylonjs/core/Materials/material";
    import type { AlphaMode } from "$lib/components/material/AlphaMode";
    import { value } from "$lib/components/material/AlphaMode";

    const mesh = getCurrentMesh();

    export let material: Material;
    export let alpha = 0.3;
    export let alphaMode: AlphaMode = "Combine";
    export let backFaceCulling = false;
    export let needDepthPrePass = false;
    export let frozen = false;

    $: material.alpha = alpha;
    $: material.alphaMode = value(alphaMode);
    $: material.backFaceCulling = backFaceCulling;
    $: material.needDepthPrePass = needDepthPrePass;
    $: frozen ? material.freeze() : material.unfreeze();

    if (mesh) {
        mesh.material = material;
    }
    destructor(() => {
        if (mesh) {
            mesh.material = null;
        }
        material.dispose();
    });
</script>

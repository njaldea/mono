<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentMesh } from "$lib/core/context/mesh";

    import type { Material } from "@babylonjs/core/Materials/material";
    import type { AlphaMode } from "$lib/components/material/AlphaMode";
    import { value } from "$lib/components/material/AlphaMode";

    const mesh = getCurrentMesh();

    let {
        material,
        alpha = 0.3,
        alphaMode = "Combine",
        backFaceCulling = false,
        needDepthPrePass = false,
        frozen = false
    }: {
        material: Material;
        alpha?: number;
        alphaMode: AlphaMode;
        backFaceCulling?: boolean;
        needDepthPrePass?: boolean;
        frozen?: boolean;
    } = $props();

    $effect(() => {
        material.alpha = alpha;
        material.alphaMode = value(alphaMode);
        material.backFaceCulling = backFaceCulling;
        material.needDepthPrePass = needDepthPrePass;
        frozen ? material.freeze() : material.unfreeze();
    });

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

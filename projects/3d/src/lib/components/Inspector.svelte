<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCore } from "$lib/core/context/core";

    const { scene, renderLoopStart, renderLoopStop } = getCore();

    destructor(() => {
        if (scene.debugLayer) {
            scene.debugLayer.hide();
            renderLoopStop();
        }
    });

    import("@babylonjs/inspector")
        .then(() => {
            if (scene.debugLayer) {
                void scene.debugLayer.show({ embedMode: true, enableClose: false });
                renderLoopStart();
            }
        })
        .catch(() => {
            console.error("Failed to import inspector");
        });
</script>

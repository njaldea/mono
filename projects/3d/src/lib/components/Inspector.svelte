<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCore } from "$lib/core/context/core";

    const core = getCore();
    const { scene } = core;

    destructor(() => {
        if (scene.debugLayer) {
            scene.debugLayer.hide();
            core.renderLoopStop();
        }
    });

    import("@babylonjs/inspector")
        .then(() => {
            if (scene.debugLayer) {
                void scene.debugLayer.show({ embedMode: true, enableClose: false });
                core.renderLoopStart();
            }
        })
        .catch(() => {
            console.error("Failed to import inspector");
        });
</script>

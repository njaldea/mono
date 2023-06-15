<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCore } from "$lib/core/context/core";

    const core = getCore();
    const { scene } = core;

    destructor(() => {
        scene.debugLayer.hide();
        core.renderLoopStop();
    });

    import("@babylonjs/inspector")
        .then(() => {
            void scene.debugLayer.show({ embedMode: true, enableClose: false });
            core.renderLoopStart();
        })
        .catch(() => {
            console.error("Failed to import inspector");
        });
</script>

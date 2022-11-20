<script lang="ts">
    import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture.js";

    import { destructor } from "$lib/core/lifecycle";
    import { setFullscreenUI } from "$lib/core/context/ui";

    const ui = AdvancedDynamicTexture.CreateFullscreenUI("fullscreen");
    setFullscreenUI(ui);
    destructor(() => ui.dispose());
</script>

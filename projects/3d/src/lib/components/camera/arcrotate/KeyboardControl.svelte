<script lang="ts">
    import { destructor } from "$lib/core/lifecycle/destructor";
    import { getCurrentCamera } from "$lib/core/context/camera";
    import { getCore } from "$lib/core/context/core";

    import type { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
    import type { KeyboardInfo } from "@babylonjs/core/Events/keyboardEvents.js";
    import { KeyboardEventTypes } from "@babylonjs/core/Events/keyboardEvents.js";

    const { scene, renderLoopStart, renderLoopStop } = getCore();
    const camera = getCurrentCamera() as ArcRotateCamera;

    camera.inputs.attachInput(camera.inputs.attached.keyboard);
    camera.keysUp = [87];
    camera.keysDown = [83];
    camera.keysLeft = [65];
    camera.keysRight = [68];

    let first = true;
    const loop = (flag: boolean) => {
        if (first) {
            first = false;
            return;
        }
        if (flag) {
            renderLoopStart();
        } else {
            renderLoopStop();
        }
    };

    let pressedKeys = new Set();
    $: flag = pressedKeys.size > 0;
    $: loop(flag);

    const onKeyboardUpdate = (info: KeyboardInfo) => {
        if ("wasdWASD".includes(info.event.key)) {
            switch (info.type) {
                case KeyboardEventTypes.KEYDOWN:
                    pressedKeys.add(info.event.key.toLowerCase());
                    break;
                case KeyboardEventTypes.KEYUP:
                    pressedKeys.delete(info.event.key.toLowerCase());
                    break;
            }
            pressedKeys = pressedKeys;
        }
    };

    scene.onKeyboardObservable.add(onKeyboardUpdate);

    destructor(() => {
        scene.onKeyboardObservable.removeCallback(onKeyboardUpdate);
        camera.inputs.attached.keyboard.detachControl();
        camera.keysUp = [];
        camera.keysDown = [];
        camera.keysLeft = [];
        camera.keysRight = [];
    });
</script>

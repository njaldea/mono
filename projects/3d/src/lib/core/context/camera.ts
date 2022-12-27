import type { Camera } from "@babylonjs/core/Cameras/camera.js";
import { camera } from "$lib/core/state/tags";
import { create } from "./_generator";

const methods = create<Camera>(camera);
export const setCurrentCamera = methods.set;
export const getCurrentCamera = methods.get;

import { ray } from "$lib/core/state/treeshake";
import { tick } from "svelte";
import { get } from "svelte/store";

export const makeUpdate = (camera: Camera) => {
    const impl = async () => {
        // need to defer update in next frame to guarantee retrigger after scene is renderered
        await tick();
        if (get(ray)) {
            camera.getViewMatrix();
        }
        camera.update();
    };
    return () => {
        void impl();
    };
};

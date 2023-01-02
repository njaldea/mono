import type { Camera } from "@babylonjs/core/Cameras/camera.js";
import { camera } from "$lib/core/state/tags";
import { create } from "./_generator";

const { get, set } = create<Camera>(camera, "@nil-/3d: Camera Not Found!");
export const setCurrentCamera = set;
export const getCurrentCamera = get;

import { ray } from "$lib/core/state/treeshake";
import { tick } from "svelte";
import { get as getStoreValue } from "svelte/store";

export const makeUpdate = (camera: Camera) => {
    const impl = async () => {
        // need to defer update in next frame to guarantee retrigger after scene is renderered
        await tick();
        if (getStoreValue(ray)) {
            camera.getViewMatrix();
        }
        camera.update();
    };
    return () => {
        void impl();
    };
};

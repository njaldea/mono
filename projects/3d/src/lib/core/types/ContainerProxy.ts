import { getCurrentMesh } from "$lib/core/context/mesh";
import type { Control } from "@babylonjs/gui/2D/controls/control.js";

export type IContainer = {
    addControl: (control: Control) => void;
    removeControl: (control: Control) => void;
};

// this will handle linking with mesh
// for now, linking with mesh is done for all root control
export class ContainerProxy {
    #container: IContainer;
    #depth: number;

    constructor(container: IContainer, current: ContainerProxy | null) {
        this.#container = container;
        this.#depth = current ? current.#depth + 1 : 0;
    }

    addControl(control: Control) {
        this.#container.addControl(control);
        // depth == 0 | root
        // depth == 1 | mesh
        // depth >= 2 | controls
        if (0 === this.#depth) {
            const mesh = getCurrentMesh();
            if (mesh != null) {
                control.linkWithMesh(mesh);
            }
        }
    }

    removeControl(control: Control) {
        this.#container.removeControl(control);
    }
}

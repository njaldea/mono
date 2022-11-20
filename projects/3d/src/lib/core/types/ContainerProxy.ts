import { getCurrentMesh } from "@nil-/3d/core/context/mesh";
import type { Control } from "@babylonjs/gui/2D/controls/control.js";

export type IContainer = {
    addControl: (control: Control) => void;
    removeControl: (control: Control) => void;
};

// this will handle linking with mesh
// for now, linking with mesh is done for all root control
export class ContainerProxy {
    constructor(private container: IContainer, public depth: number) {}

    public addControl(control: Control) {
        this.container.addControl(control);
        // depth == 0 | root
        // depth == 1 | mesh
        // depth >= 2 | controls
        if (this.depth === 0) {
            const mesh = getCurrentMesh();
            if (mesh != null) {
                control.linkWithMesh(mesh);
            }
        }
    }

    public removeControl(control: Control) {
        this.container.removeControl(control);
    }
}

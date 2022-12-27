import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import { mesh } from "$lib/core/state/tags";
import { create } from "./_generator";

const { get, set } = create<AbstractMesh>(mesh);
export const setCurrentMesh = set;
export const getCurrentMesh = get;

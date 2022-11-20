import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import { tags } from "$lib/core/state/tags";
import { create } from "./_generator";

const { get, set } = create<AbstractMesh>(tags.mesh);
export const setCurrentMesh = set;
export const getCurrentMesh = get;

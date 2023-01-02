import { canvas } from "$lib/core/state/tags";
import { create } from "./_generator";

const { get, set } = create<HTMLCanvasElement>(canvas, "@nil-/3d: Canvas Not Found!");
export const setCurrentCanvas = set;
export const getCurrentCanvas = get;

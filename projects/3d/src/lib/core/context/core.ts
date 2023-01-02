import type { Core } from "$lib/core/types/Core";
import { core } from "$lib/core/state/tags";
import { create } from "./_generator";

const { get, set } = create<Core>(core, "@nil-/3d: Core Not Found!");
export const setCore = set;
export const getCore = get;

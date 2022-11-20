import type { Core } from "$lib/core/types/Core";
import { tags } from "$lib/core/state/tags";
import { create } from "./_generator";

const { get, set } = create<Core>(tags.core);
export const setCore = set;
export const getCore = get;

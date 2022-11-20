import type { Node } from "@babylonjs/core/node.js";
import { tags } from "$lib/core/state/tags";
import { create } from "./_generator";

const { get, set } = create<Node>(tags.node);
export const setNode = set;
export const getNode = get;

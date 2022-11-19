import type { Control } from "../types";

import { getContext, setContext } from "svelte";
import { writable } from "svelte/store";

import type { Writable } from "svelte/store";

export type ParamValues = Record<string, any>;
export type Params = { id: number; tag: string; values: ParamValues };
const params = Symbol();

export function initParams() {
    return setContext(params, writable<Params[]>([]));
}

export function getParams() {
    return getContext<Writable<Params[]>>(params);
}

const current = Symbol();

export function initCurrent() {
    return setContext<Writable<number | null>>(current, writable(null));
}
export function getCurrent() {
    return getContext<Writable<number | null>>(current);
}

const controls = Symbol();
export function initControls() {
    return setContext<Writable<Control[]>>(controls, writable([]));
}
export function getControls() {
    return getContext<Writable<Control[]>>(controls);
}

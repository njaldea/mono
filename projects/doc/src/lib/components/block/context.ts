import type { Control } from "./controls/types";

import { getContext, setContext } from "svelte";
import { writable } from "svelte/store";

import type { Writable } from "svelte/store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParamValues = Record<string, any>;
export type Params = { id: number; tag: string; values: ParamValues };

function create<T>(defaulter: () => T) {
    const symbol = Symbol();
    return {
        init: () => setContext<Writable<T>>(symbol, writable(defaulter())),
        get: () => getContext<Writable<T>>(symbol)
    };
}

export const { init: initCurrent, get: getCurrent } = create<number | null>(() => null);
export const { init: initParams, get: getParams } = create<Params[]>(() => []);
export const { init: initControls, get: getControls } = create<Control[]>(() => []);

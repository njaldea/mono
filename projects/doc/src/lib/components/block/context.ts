/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Control } from "./controls/types";

import { getContext, setContext } from "svelte";
import { writable } from "svelte/store";

import type { Writable } from "svelte/store";

export type Params = {
    id: number;
    tag?: string;
    values: Record<string, any>;
    defaults: Record<string, any>;
};
export type ControlState = {
    expand: boolean;
};

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
export const { init: initDefaults, get: getDefaults } = create<Record<string, any> | null>(
    () => null
);
export const { init: initControlsState, get: getControlsState } = create<ControlState>(() => ({
    expand: false
}));

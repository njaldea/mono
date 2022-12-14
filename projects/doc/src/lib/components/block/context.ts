import { getContext, setContext } from "svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

import type { Control } from "./controls/types";
import type { ValueType } from "./types";

export type Params = {
    id: number;
    tag: string;
    values: Record<string, ValueType>;
};

export type ControlState = {
    hide: boolean;
    position?: "bottom" | "right";
};

const create = <T>(defaulter: () => T) => {
    const symbol = Symbol();
    return {
        init: () => setContext<Writable<T>>(symbol, writable(defaulter())),
        get: () => getContext<Writable<T>>(symbol)
    };
};

export const { init: initParams, get: getParams } = create<Params[]>(() => []);
export const { init: initControls, get: getControls } = create<Control[]>(() => []);
export const { init: initDefaults, get: getDefaults } = create<Record<string, ValueType>>(
    () => ({})
);
export const { init: initControlsState, get: getControlsState } = create<ControlState>(() => ({
    hide: false
}));
export const { init: initOrientation, get: getOrientation } = create<boolean>(() => false);

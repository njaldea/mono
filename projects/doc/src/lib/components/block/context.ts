import type { Control } from "./controls/types";

import { getContext, setContext } from "svelte";
import { writable } from "svelte/store";

import type { Writable } from "svelte/store";

export type ValueType =
    | undefined
    | boolean
    | number
    | string
    | ValueType[]
    | {
          [key: string]: ValueType;
      };

export type Params = {
    id: number;
    tag: string;
    values: Record<string, ValueType>;
    defaults: Record<string, ValueType>;
};

export type ControlState = {
    hide: boolean;
    side: boolean;
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
export const { init: initDefaults, get: getDefaults } = create<Record<string, ValueType> | null>(
    () => null
);
export const { init: initControlsState, get: getControlsState } = create<ControlState>(() => ({
    hide: false,
    side: false
}));

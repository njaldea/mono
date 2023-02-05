import { getContext, setContext } from "svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

import type { Prop, Event } from "./controls/types";
import type { ValueType } from "./types";

export type Params = {
    id: number;
    tag: string;
    values: Record<string, ValueType>;
};

export type ControlState = {
    position: "bottom" | "right" | "hidden";
    mode: "prop" | "event";
};

const create = <T>(defaulter: () => T) => {
    const symbol = Symbol();
    return {
        init: () => setContext<Writable<T>>(symbol, writable(defaulter())),
        get: () => getContext<Writable<T>>(symbol)
    };
};

export const { init: initParams, get: getParams } = create<Params[]>(() => []);

type Controls = {
    props: Prop[];
    events: Event[];
};
export const { init: initControls, get: getControls } = create<Controls>(() => ({
    props: [],
    events: []
}));
export const { init: initDefaults, get: getDefaults } = create<Record<string, ValueType>>(
    () => ({})
);
export const { init: initControlsState, get: getControlsState } = create<ControlState>(() => ({
    position: "hidden",
    mode: "prop"
}));
export const { init: initOrientation, get: getOrientation } = create<boolean>(() => false);

import { getContext, setContext } from "svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

import type { Prop, SpecialProp, Event } from "./controls/types";
import type { ValueType } from "./types";

export type Params = {
    id: number;
    tag: string;
    values: Record<string, ValueType>;
};

const create = <T>(defaulter: () => T) => {
    const symbol = Symbol();
    return {
        init: () => setContext<Writable<T>>(symbol, writable(defaulter())),
        get: () => getContext<Writable<T>>(symbol)
    };
};

export const { init: initParams, get: getParams } = create<Params[]>(() => []);

export type Controls = {
    props: (Prop | SpecialProp)[];
    events: Event[];
};
export type ControlValue = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: Record<string, any>;
    events: { name: string; detail: string; count: number }[];
};

// prettier-ignore
export const { init: initControls, get: getControls } = create<Controls>(() => ({ props: [], events: [] }));
// prettier-ignore
export const { init: initDefaults, get: getDefaults } = create<Record<string, ValueType>>(() => ({}));
// prettier-ignore
export const { init: initOrientation, get: getOrientation } = create<boolean>(() => false);
// prettier-ignore
export const { init: initControlInfo, get: getControlInfo } = create<Writable<Controls> | null>(() => writable());
// prettier-ignore
export const {init: initControlValue, get: getControlValue } = create<Writable<ControlValue> | null>(() => writable());

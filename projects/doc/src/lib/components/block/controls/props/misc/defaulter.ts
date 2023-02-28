import type { ValueType } from "../../../types";
import type { Unionized, PropType, Prop } from "../../types";

import { getType, getValues, getMin } from "./utils";

export function defaulter(i: Unionized<PropType<"tuple">>): ValueType[];
export function defaulter(i: Unionized<PropType<"object">>): Record<string, ValueType>;
export function defaulter(i: Unionized<PropType<"number">>): number;
export function defaulter(i: Unionized<PropType<"range">>): number;
export function defaulter(i: Unionized<PropType<"select">>): string;
export function defaulter(i: Unionized<PropType<"text">>): string;
export function defaulter(i: Unionized<PropType<"toggle">>): boolean;
export function defaulter(i: Unionized<PropType<"color">>): string;
export function defaulter(i: Prop): ValueType;
// eslint-disable-next-line func-style
export function defaulter(i: Prop): ValueType {
    switch (getType(i)) {
        case "object":
            // eslint-disable-next-line no-use-before-define
            return defaulterO(i as Unionized<PropType<"object">>);
        case "tuple":
            // eslint-disable-next-line no-use-before-define
            return defaulterT(i as Unionized<PropType<"tuple">>);
        case "text":
            return "";
        case "color":
            return "#ffffffff";
        case "select":
            return getValues(i as Unionized<PropType<"select">>)[0] ?? "";
        case "number":
            return 0;
        case "range":
            return getMin(i as Unionized<PropType<"range">>);
        case "toggle":
        default:
            return false;
    }
}

const defaulterO = (info: Unionized<PropType<"object">>) => {
    const ret: Record<string, ValueType> = {};
    const values = info instanceof Array ? info[2] : info.values;
    for (const v of values) {
        if (v instanceof Array) {
            ret[v[0]] = defaulter(v);
        } else {
            ret[v.name] = defaulter(v);
        }
    }
    return ret;
};

const defaulterT = (info: Unionized<PropType<"tuple">>) => {
    const ret: ValueType[] = [];
    const values = info instanceof Array ? info[2] : info.values;
    for (const [i, v] of values.entries()) {
        if (v instanceof Array) {
            ret.push(defaulter([`${i}`, ...v]));
        } else {
            ret.push(defaulter({ name: `${i}`, ...v }));
        }
    }
    return ret;
};

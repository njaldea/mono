import type { ValueType } from "../../../types";
import type { Unionized, PropType, Prop } from "../../types";

export function getDefault(i: Unionized<PropType<"tuple">>): ValueType[];
export function getDefault(i: Unionized<PropType<"object">>): Record<string, ValueType>;
export function getDefault(i: Unionized<PropType<"number">>): number;
export function getDefault(i: Unionized<PropType<"range">>): number;
export function getDefault(i: Unionized<PropType<"select">>): string;
export function getDefault(i: Unionized<PropType<"text">>): string;
export function getDefault(i: Unionized<PropType<"switch">>): boolean;
export function getDefault(i: Prop): ValueType;
// eslint-disable-next-line func-style
export function getDefault(i: Prop): ValueType {
    if (i instanceof Array) {
        switch (i[1]) {
            case "object":
                // eslint-disable-next-line no-use-before-define
                return getObjectDefaults(i);
            case "tuple":
                // eslint-disable-next-line no-use-before-define
                return getTupleDefaults(i);
            case "text":
                return "";
            case "select":
                return i[2].length > 0 ? i[2][0] : "";
            case "number":
                return 0;
            case "range":
                return i[2];
            case "switch":
            default:
                return false;
        }
    } else {
        switch (i.type) {
            case "object":
                // eslint-disable-next-line no-use-before-define
                return getObjectDefaults(i);
            case "tuple":
                // eslint-disable-next-line no-use-before-define
                return getTupleDefaults(i);
            case "text":
                return "";
            case "select":
                return i.values.length > 0 ? i.values[0] : "";
            case "number":
                return 0;
            case "range":
                return i.min;
            case "switch":
            default:
                return false;
        }
    }
}

const getObjectDefaults = (info: Unionized<PropType<"object">>) => {
    const ret: Record<string, ValueType> = {};
    const values = info instanceof Array ? info[2] : info.values;
    for (const v of values) {
        if (v instanceof Array) {
            ret[v[0]] = getDefault(v);
        } else {
            ret[v.name] = getDefault(v);
        }
    }
    return ret;
};

const getTupleDefaults = (info: Unionized<PropType<"tuple">>) => {
    const ret: ValueType[] = [];
    const values = info instanceof Array ? info[2] : info.values;
    for (const [i, v] of values.entries()) {
        if (v instanceof Array) {
            ret.push(getDefault([`${i}`, ...v]));
        } else {
            ret.push(getDefault({ name: `${i}`, ...v }));
        }
    }
    return ret;
};

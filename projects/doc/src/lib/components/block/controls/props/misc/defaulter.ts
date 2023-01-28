import type { ValueType } from "../../../types";
import type { Prop, Name } from "../../types";
import type {
    PropNumber,
    PropRange,
    PropSelect,
    PropSwitch,
    PropText,
    PropTuple,
    PropObject
} from "../../types";
import type {
    FlatPropNumber,
    FlatPropRange,
    FlatPropSelect,
    FlatPropSwitch,
    FlatPropText,
    FlatPropTuple,
    FlatPropObject
} from "../../types";

export function getDefault(i: (Name & PropTuple) | [string, ...FlatPropTuple]): ValueType[];
export function getDefault(
    i: (Name & PropObject) | [string, ...FlatPropObject]
): Record<string, ValueType>;
export function getDefault(i: (Name & PropNumber) | [string, ...FlatPropNumber]): number;
export function getDefault(i: (Name & PropRange) | [string, ...FlatPropRange]): number;
export function getDefault(i: (Name & PropSelect) | [string, ...FlatPropSelect]): string;
export function getDefault(i: (Name & PropText) | [string, ...FlatPropText]): string;
export function getDefault(i: (Name & PropSwitch) | [string, ...FlatPropSwitch]): boolean;
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

const getObjectDefaults = (info: (Name & PropObject) | [string, ...FlatPropObject]) => {
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

const getTupleDefaults = (info: (Name & PropTuple) | [string, ...FlatPropTuple]) => {
    const ret: ValueType[] = [];
    const values = info instanceof Array ? info[2] : info.values;
    values.forEach((v, i) => {
        if (v instanceof Array) {
            ret.push(getDefault([`${i}`, ...v]));
        } else {
            ret.push(getDefault({ name: `${i}`, ...v }));
        }
    });
    return ret;
};

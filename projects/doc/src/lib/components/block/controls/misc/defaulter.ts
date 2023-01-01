import type { ValueType } from "../../context";
import type { Control, ControlTuple, ControlObject } from "../types";

export const getDefault = <T extends Control>(i: T) => {
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
};

const getObjectDefaults = (info: ControlObject) => {
    const ret: Record<string, ValueType> = {};
    for (const i of info.values) {
        ret[i.name] = getDefault(i);
    }
    return ret;
};

const getTupleDefaults = (i: ControlTuple) => {
    const ret: ValueType[] = [];
    for (const info of i.values) {
        ret.push(getDefault(info as Control));
    }
    return ret;
};

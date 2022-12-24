import type { ValueType } from "../../context";
import type { Control, ControlTuple, ControlObject } from "../types";

export const getDefault = (i: Control): ValueType => {
    if ("switch" === i.type) {
        return false;
    }
    if ("number" === i.type) {
        return 0;
    }
    if ("range" === i.type) {
        return i.min;
    }
    if ("text" === i.type) {
        return "";
    }
    if ("select" === i.type) {
        return i.values.length > 0 ? i.values[0] : "";
    }
    if ("tuple" === i.type) {
        // eslint-disable-next-line no-use-before-define
        return [...getTupleDefaults(i)];
    }
    if ("object" === i.type) {
        // eslint-disable-next-line no-use-before-define
        return getObjectDefaults(i);
    }
    return undefined;
};

export const getObjectDefaults = (info: ControlObject) => {
    const ret: Record<string, ValueType> = {};
    for (const i of info.values) {
        ret[i.name] = getDefault(i);
    }
    return ret;
};

export const getTupleDefaults = (i: ControlTuple) => {
    const ret: ValueType[] = [];
    for (const info of i.values) {
        ret.push(getDefault(info as Control));
    }
    return ret;
};

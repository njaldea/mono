import type { ValueType } from "../../context";
import type { Control, ControlTuple, ControlObject } from "../types";

export function getObjectDefaults(info: ControlObject) {
    const ret: Record<string, ValueType> = {};
    for (const i of info.values) {
        ret[i.name] = getDefault(i);
    }
    return ret;
}

export function getTupleDefaults(i: ControlTuple) {
    const ret: ValueType[] = [];
    for (const info of i.values) {
        ret.push(getDefault(info as Control));
    }
    return ret;
}

export function getDefault(i: Control): ValueType {
    if (i.type === "switch") {
        return false;
    }
    if (i.type === "number") {
        return 0;
    }
    if (i.type === "range") {
        return i.min;
    }
    if (i.type === "text") {
        return "";
    }
    if (i.type === "select") {
        return i.values.length > 0 ? i.values[0] : "";
    }
    if (i.type === "tuple") {
        return [...getTupleDefaults(i)];
    }
    if (i.type === "object") {
        return getObjectDefaults(i);
    }
    return undefined;
}

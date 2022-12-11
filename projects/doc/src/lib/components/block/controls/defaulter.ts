import type { Control, ControlTuple, ControlObject } from "./types";

export function getObjectDefaults(info: ControlObject) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ret: Record<string, any> = {};
    for (const i of info.values) {
        ret[i.name] = getDefault(i);
    }
    return ret;
}

export function getTupleDefaults(i: ControlTuple) {
    const ret = [];
    for (const info of i.values) {
        ret.push(getDefault(info as Control));
    }
    return ret;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDefault(i: Control): any {
    if (i.type === "number") {
        return 0;
    }
    if (i.type === "range") {
        return i.min;
    }
    if (i.type === "switch") {
        return false;
    }
    if (i.type === "tuple") {
        return [...getTupleDefaults(i)];
    }
    if (i.type === "object") {
        return getObjectDefaults(i);
    }
    // "select" | "text"
    return "";
}

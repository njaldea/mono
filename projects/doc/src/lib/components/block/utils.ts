import type { ValueType } from "./types";

type VTArray = ValueType[];
type VTObject = Record<string, ValueType>;

const resolveArray = (d: VTArray, p: VTArray) => {
    const ret: VTArray = [];
    for (let i = 0; i < d.length; ++i) {
        if (d[i] instanceof Array) {
            ret.push(resolveArray(d[i] as VTArray, (p[i] ?? []) as VTArray));
        } else if (d[i] instanceof Object) {
            // eslint-disable-next-line no-use-before-define
            ret.push(resolveObject(d[i] as VTObject, (p[i] ?? {}) as VTObject));
        } else {
            ret.push(p[i] ?? d[i]);
        }
    }
    return ret;
};

const resolveObject = (d: VTObject, p: VTObject) => {
    const ret: VTObject = {};
    for (const [key, value] of Object.entries(d)) {
        if (value instanceof Array) {
            ret[key] = resolveArray(value, (p[key] ?? []) as VTArray);
        } else if (value instanceof Object) {
            ret[key] = resolveObject(value, (p[key] ?? {}) as VTObject);
        } else {
            ret[key] = p[key] ?? value;
        }
    }
    return ret;
};

export const resolve = <Args = Record<string, ValueType>>(
    destination: VTObject,
    override: VTObject
) => {
    return resolveObject(destination, override) as Args;
};

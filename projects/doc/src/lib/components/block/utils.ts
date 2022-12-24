import type { ValueType } from "./context";

type VTArray = ValueType[];
type VTObject = { [key: string]: ValueType };

const resolveArray = (d: VTArray | undefined, p: VTArray) => {
    if (d === undefined) {
        return undefined;
    }
    const ret: VTArray = [];
    for (const i in d) {
        if (d[i] instanceof Array) {
            ret.push(resolveArray(d[i] as VTArray, (p[i] as VTArray) ?? []));
        } else if (d[i] instanceof Object) {
            // eslint-disable-next-line no-use-before-define
            ret.push(resolveObject(d[i] as VTObject, (p[i] as VTObject) ?? {}));
        } else {
            ret.push(p[i] ?? d[i]);
        }
    }
    return ret;
};

const resolveObject = (d: VTObject | undefined, p: VTObject) => {
    if (d === undefined) {
        return undefined;
    }
    const ret: VTObject = {};
    for (const [key, value] of Object.entries(d)) {
        if (value instanceof Array) {
            ret[key] = resolveArray(value, (p[key] as VTArray) ?? []);
        } else if (value instanceof Object) {
            ret[key] = resolveObject(value, (p[key] as VTObject) ?? {});
        } else {
            ret[key] = p[key] ?? value;
        }
    }
    return ret;
};

export const resolve = <Args>(d: VTObject | undefined, p: VTObject): Args =>
    resolveObject(d ?? {}, p) as Args;

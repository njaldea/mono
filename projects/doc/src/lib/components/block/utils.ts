/* eslint-disable @typescript-eslint/no-explicit-any */
function resolveArray(d: any[] | undefined, p: any[]): any[] | undefined {
    if (d === undefined) {
        return undefined;
    }
    const ret = [];
    for (const i in d) {
        if (d[i] instanceof Array) {
            ret.push(resolveArray(d[i], p[i] ?? []));
        } else if (d[i] instanceof Object) {
            ret.push(resolveObject(d[i], p[i] ?? {}));
        } else {
            ret.push(p[i] ?? d[i]);
        }
    }
    return ret;
}

function resolveObject(
    d: Record<string, any> | undefined,
    p: Record<string, any>
): Record<string, any> | undefined {
    if (d === undefined) {
        return undefined;
    }
    const ret: Record<string, any> = {};
    for (const [key, value] of Object.entries(d)) {
        if (value instanceof Array) {
            ret[key] = resolveArray(value, p[key] ?? []);
        } else if (value instanceof Object) {
            ret[key] = resolveObject(value, p[key] ?? {});
        } else {
            ret[key] = p[key] ?? value;
        }
    }
    return ret;
}

export function resolve<Args>(d: Args | undefined, p: Record<string, any>): Args {
    return resolveObject(d ?? {}, p) as Args;
}

import type { Value } from "./types";

type Impl = (...values: Value[]) => Value[];

export const debounce = (cb: Impl, timeout = 1000) => {
    let rejection: null | ((reason?: unknown) => void) = null;
    let identifier: null | ReturnType<typeof setTimeout> = null;

    return async (v: Value) => {
        return new Promise<Value[]>((resolve, reject) => {
            if (identifier && rejection) {
                clearTimeout(identifier);
                rejection("debounced");
            }

            rejection = reject;
            identifier = setTimeout(() => {
                identifier = null;
                resolve(cb(v));
            }, timeout);
        });
    };
};

export const delayed = (cb: Impl, timeout = 1000) => {
    return (v: Value) => {
        return new Promise<Value[]>((resolve) => {
            setTimeout(() => resolve(cb(v)), timeout);
        });
    };
};

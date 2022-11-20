import type { Tree } from "./types";

const match = /(\d+)-(.+)/;

function order<T extends string | number>(l: T, r: T) {
    if (l < r) {
        return -1;
    }
    if (l > r) {
        return +1;
    }
    return 0;
}

export function sort(t: Record<string, Tree>) {
    return Object.entries(t).sort(([l], [r]) => {
        const lmatch = match.exec(l);
        const rmatch = match.exec(r);
        if (lmatch == null && rmatch == null) {
            return order(l, r);
        }
        if (lmatch == null) {
            return 1;
        }
        if (rmatch == null) {
            return -1;
        }
        return order(parseInt(lmatch[1]), parseInt(rmatch[1]));
    });
}

export function rename(t: string) {
    const m = match.exec(t);
    if (m) {
        return m[2];
    }
    return t;
}

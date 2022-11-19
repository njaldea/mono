import type { Tree } from "./types";

const match = /(\d+)-(.+)/;

export function sort(t: Record<string, Tree>) {
    return Object.entries(t).sort((l, r) => {
        const lmatch = match.exec(l[0]);
        const rmatch = match.exec(r[0]);
        if (lmatch == null && rmatch == null) {
            return 0;
        }
        if (lmatch == null) {
            return 1;
        }
        if (rmatch == null) {
            return -1;
        }
        return parseInt(lmatch[1]) - parseInt(rmatch[1]);
    });
}

export function rename(t: string) {
    const m = match.exec(t);
    if (m) {
        return m[2];
    }
    return t;
}

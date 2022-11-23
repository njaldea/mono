import type { Tree, Sorter, Renamer } from "./types";

const match = /(\d+)-(.+)/;

function sorterT<T extends string | number>(l: T, r: T) {
    if (l < r) {
        return -1;
    }
    if (l > r) {
        return +1;
    }
    return 0;
}

const sorter: Sorter = (l: string, r: string) => {
    const lmatch = match.exec(l);
    const rmatch = match.exec(r);
    if (lmatch == null && rmatch == null) {
        return sorterT(l, r);
    }
    if (lmatch == null) {
        return 1;
    }
    if (rmatch == null) {
        return -1;
    }
    return sorterT(parseInt(lmatch[1]), parseInt(rmatch[1]));
};

const renamer: Renamer = (t: string) => {
    const m = match.exec(t);
    if (m) {
        return m[2];
    }
    return t;
};

export function sort(t: Record<string, Tree>, order: (l: string, r: string) => 1 | 0 | -1) {
    return Object.entries(t).sort(([l], [r]) => order(l, r));
}

export { sorter, renamer };

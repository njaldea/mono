import type { Tree } from "../types";

export const sort = (t: Record<string, Tree>, order: (l: string, r: string) => 1 | 0 | -1) => {
    return Object.entries(t).sort(([l], [r]) => order(l, r));
};

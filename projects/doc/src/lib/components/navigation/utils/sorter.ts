import type { Sorter } from "../types";

const match = /(\d+)-(.+)/;

type ThreeWay = -1 | 0 | 1;

const sorterT = <T extends string | number>(l: T, r: T): ThreeWay => {
    if (l < r) {
        return -1;
    }
    if (l > r) {
        return +1;
    }
    return 0;
};

/**
 * Compares two texts for sorting.
 *
 * If the texts follows `<I>-<Name>` format,
 * sorting is done by comparing the numbers in the prefix.
 *
 * If only one of the texts follows `<I>-<Name>` format,
 * the text that follows the format is considered as higher in order.
 *
 * Else comparison is done using built-in `string` comparison.
 *
 * @param l - left operand
 * @param r - right operand
 * @returns `-1 | 0 | +1`
 */
export const sorter: Sorter = (l: string, r: string): ThreeWay => {
    const lmatch = match.exec(l);
    const rmatch = match.exec(r);

    if (null == lmatch && null == rmatch) {
        return sorterT(l, r);
    }

    if (null == lmatch) {
        return 1;
    }

    if (null == rmatch) {
        return -1;
    }

    return sorterT(parseInt(lmatch[1]), parseInt(rmatch[1])) || sorterT(lmatch[2], rmatch[2]);
};

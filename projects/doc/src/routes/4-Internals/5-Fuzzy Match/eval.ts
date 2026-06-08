const byPair = function* (data: number[]): Generator<[number, number]> {
    const len = data.length;
    for (let i = 1; i < len; ++i) {
        yield [data[i - 1], data[i]];
    }
};

const ranges = function* (matches: number[]): Generator<[number, number]> {
    const count = matches.length;
    if (1 === count) {
        yield [matches[0], matches[0]];
    }
    if (1 < count) {
        let ongoing = matches[0];
        const last = matches[matches.length - 1];
        for (const [l, r] of byPair(matches)) {
            if (l + 1 !== r) {
                yield [ongoing, l];
                ongoing = r;
            }
            if (r === last) {
                yield [ongoing, r];
            }
        }
    }
};

export const split = function* (text: string, matches: number[]) {
    let last = 0;
    for (const [l, r] of ranges(matches)) {
        if (l !== last) {
            yield text.substring(last, l);
        }
        yield text.substring(l, r + 1);
        last = r + 1;
    }
    if (last !== text.length) {
        yield text.substring(last);
    }
};

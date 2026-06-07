import { sort as SUT } from "./sort";

import { describe, it, expect } from "vitest";

const sorter = (l: string, r: string) => {
    if (l < r) return -1;
    if (l > r) return +1;
    return 0;
};

describe("sort", () => {
    it("returns sorted array of entries", () => {
        expect(
            SUT(
                {
                    key1: {
                        url: "key1 url",
                        sub: {}
                    },
                    key3: {
                        url: "key0 url",
                        sub: {}
                    },
                    key2: {
                        url: "key2 url",
                        sub: {}
                    }
                },
                sorter
            )
        ).is.deep.equal([
            ["key1", { url: "key1 url", sub: {} }],
            ["key2", { url: "key2 url", sub: {} }],
            ["key3", { url: "key0 url", sub: {} }]
        ]);
    });
});

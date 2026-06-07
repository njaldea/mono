import { sorter as SUT } from "./sorter";

import { describe, it, expect } from "vitest";

describe("sorter", () => {
    it("returns -1 when less", () => {
        expect(SUT("this should be less", "this should be more")).is.equal(-1);
        expect(SUT("123-this should be more", "124-this should be less")).is.equal(-1);
        expect(SUT("100-this should be less", "100-this should be more")).is.equal(-1);
        expect(SUT("200-this should be equal", "this should be equal")).is.equal(-1);
    });

    it("returns 1 when greater", () => {
        expect(SUT("this should be more", "this should be less")).is.equal(1);
        expect(SUT("124-this should be less", "123-this should be more")).is.equal(1);
        expect(SUT("100-this should be more", "100-this should be less")).is.equal(1);
        expect(SUT("this should be equal", "200-this should be equal")).is.equal(1);
    });

    it("returns 0 when equal", () => {
        expect(SUT("this should be equal", "this should be equal")).is.equal(0);
        expect(SUT("124-this should be equal", "124-this should be equal")).is.equal(0);
    });
});

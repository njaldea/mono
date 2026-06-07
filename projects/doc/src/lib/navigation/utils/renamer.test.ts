import { renamer as SUT } from "./renamer";

import { describe, it, expect } from "vitest";

describe("renamer", () => {
    it("returns as it is", () => {
        expect(SUT("this is a string")).is.equal("this is a string");
        expect(SUT("-this is a string")).is.equal("-this is a string");
        expect(SUT("pre-this is a string")).is.equal("pre-this is a string");

        expect(SUT("123-this is a string")).is.not.equal("123-this is a string");
    });

    it("returns string without number prefix", () => {
        expect(SUT("123-this is a string")).is.equal("this is a string");
        expect(SUT("098-this is a string")).is.equal("this is a string");
    });
});

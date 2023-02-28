import { defaulter as SUT } from "./defaulter";

import { describe, it, expect } from "vitest";

describe("defaulter basic", () => {
    it("returns `false` when type is `toggle`", () => {
        expect(SUT({ name: "name", type: "toggle" })).toBe(false);
        expect(SUT(["name", "toggle"])).toBe(false);
    });
    it("returns 0 when type is `number`", () => {
        expect(SUT({ name: "name", type: "number" })).toBe(0);
        expect(SUT(["name", "number"])).toBe(0);
    });
    it("returns `min` when type is `range`", () => {
        expect(SUT({ name: "name", type: "range", min: 100, max: 200, step: 10 })).toBe(100);
        expect(SUT(["name", "range", 100, 200, 10])).toBe(100);
    });
    it("returns empty string when type is `text`", () => {
        expect(SUT({ name: "name", type: "text" })).toBe("");
        expect(SUT(["name", "text"])).toBe("");
    });
    it("returns first when type is `select`", () => {
        expect(SUT({ name: "name", type: "select", values: ["first", "second"] })).toBe("first");
        expect(SUT(["name", "select", ["first", "second"]])).toBe("first");
    });
    it("returns empty string when type is `select` and no values provided", () => {
        expect(SUT({ name: "name", type: "select", values: [] })).toBe("");
        expect(SUT(["name", "select", []])).toBe("");
    });
});

describe("defaulter advanced", () => {
    it("returns array of defaults when type is `tuple`", () => {
        expect(
            SUT({
                name: "name",
                type: "tuple",
                values: [
                    {
                        type: "toggle"
                    },
                    {
                        type: "number"
                    },
                    {
                        type: "range",
                        min: 1000,
                        max: 2000,
                        step: 10
                    },
                    {
                        type: "text"
                    },
                    {
                        type: "select",
                        values: ["second", "first"]
                    }
                ]
            })
        ).toStrictEqual([false, 0, 1000, "", "second"]);

        expect(
            SUT([
                "name",
                "tuple",
                [
                    ["toggle"],
                    ["number"],
                    ["range", 1000, 2000, 10],
                    ["text"],
                    ["select", ["second", "first"]]
                ]
            ])
        ).toStrictEqual([false, 0, 1000, "", "second"]);
    });

    it("returns dictionary of defaults when type is `object`", () => {
        expect(
            SUT({
                name: "name",
                type: "object",
                values: [
                    {
                        name: "vToggle",
                        type: "toggle"
                    },
                    {
                        name: "vNumber",
                        type: "number"
                    },
                    {
                        name: "vRange",
                        type: "range",
                        min: 1000,
                        max: 2000,
                        step: 10
                    },
                    {
                        name: "vText",
                        type: "text"
                    },
                    {
                        name: "vSelect",
                        type: "select",
                        values: ["last", "third"]
                    }
                ]
            })
        ).toStrictEqual({
            vToggle: false,
            vNumber: 0,
            vRange: 1000,
            vText: "",
            vSelect: "last"
        });

        expect(
            SUT([
                "name",
                "object",
                [
                    ["vToggle", "toggle"],
                    ["vNumber", "number"],
                    ["vRange", "range", 1000, 2000, 10],
                    ["vText", "text"],
                    ["vSelect", "select", ["last", "third"]]
                ]
            ])
        ).toStrictEqual({
            vToggle: false,
            vNumber: 0,
            vRange: 1000,
            vText: "",
            vSelect: "last"
        });
    });
});

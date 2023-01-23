import { getDefault as SUT } from "./defaulter";

import { describe, it, expect } from "vitest";

describe("defaulter basic", () => {
    it("returns `false` when type is `switch`", () => {
        expect(SUT({ type: "switch", name: "name" })).toBe(false);
    });
    it("returns 0 when type is `number`", () => {
        expect(SUT({ type: "number", name: "name" })).toBe(0);
    });
    it("returns `min` when type is `range`", () => {
        expect(SUT({ type: "range", name: "name", min: 100, max: 200, step: 10 })).toBe(100);
    });
    it("returns empty string when type is `text`", () => {
        expect(SUT({ type: "text", name: "name" })).toBe("");
    });
    it("returns first when type is `select`", () => {
        expect(SUT({ type: "select", name: "name", values: ["first", "second"] })).toBe("first");
    });
    it("returns empty string when type is `select` and no values provided", () => {
        expect(SUT({ type: "select", name: "name", values: [] })).toBe("");
    });
});

describe("defaulter advanced", () => {
    it("returns array of defaults when type is `tuple`", () => {
        expect(
            SUT({
                type: "tuple",
                name: "name",
                values: [
                    {
                        type: "switch"
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
    });

    it("returns dictionary of defaults when type is `object`", () => {
        expect(
            SUT({
                type: "object",
                name: "name",
                values: [
                    {
                        name: "vSwitch",
                        type: "switch"
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
            vSwitch: false,
            vNumber: 0,
            vRange: 1000,
            vText: "",
            vSelect: "last"
        });
    });
});

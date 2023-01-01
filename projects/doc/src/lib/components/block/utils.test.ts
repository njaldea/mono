import { resolve as SUT } from "./utils";

import { describe, it, expect } from "vitest";

describe("resolve basic", () => {
    it("returns a copy of an object", () => {
        const input = {
            dummy: "value",
            nest: {
                object: { key: "object" },
                array: [{ key: 1 }, { key: "1" }]
            }
        };
        const output: typeof input = SUT(input, {});
        // not equal means that they are not of the same object reference
        expect(output).is.not.equal(input);
        // deep equal means that they are compared recursively (deep check)
        expect(output).is.deep.equal(input);
        expect(output.nest).is.not.equal(input.nest);
        expect(output.nest).is.deep.equal(input.nest);
        expect(output.nest.object).is.not.equal(input.nest.object);
        expect(output.nest.object).is.deep.equal(input.nest.object);
        expect(output.nest.array).is.not.equal(input.nest.array);
        expect(output.nest.array).is.deep.equal(input.nest.array);
        expect(output.nest.array[0]).is.not.equal(input.nest.array[0]);
        expect(output.nest.array[0]).is.deep.equal(input.nest.array[0]);
        expect(output.nest.array[1]).is.not.equal(input.nest.array[1]);
        expect(output.nest.array[1]).is.deep.equal(input.nest.array[1]);
    });

    it("returns a values with full override", () => {
        const input = {
            dummy: "value",
            nest: {
                object: { key: "object" },
                array: [{ key: 1 }, ["in_array"]]
            }
        };
        const override = {
            dummy: "value_override",
            nest: {
                object: { key: "object_override" },
                array: [{ key: 2 }, ["in_array_override"]]
            }
        };
        const output = SUT(input, override);

        const check = {
            dummy: "value_override",
            nest: {
                object: { key: "object_override" },
                array: [{ key: 2 }, ["in_array_override"]]
            }
        };
        expect(output).is.deep.equal(check);
    });

    it("returns a values with partial override", () => {
        const input = {
            dummy: "value",
            nest: {
                object: { key: "object" },
                array: [{ key: 1 }, ["in_array"]]
            }
        };
        const override = {
            nest: {
                array: [{ key: 200 }]
            }
        };
        const output = SUT(input, override);

        const check = {
            dummy: "value",
            nest: {
                object: { key: "object" },
                array: [{ key: 200 }, ["in_array"]]
            }
        };
        expect(output).is.deep.equal(check);
    });
});

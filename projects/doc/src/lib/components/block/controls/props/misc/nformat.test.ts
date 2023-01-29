import { nformat as SUT } from "./nformat";

import { describe, it, expect } from "vitest";

describe("nformat", () => {
    it("setup for short", () => {
        expect(SUT(1.1e1, 3, 5)).is.eq("+11.0000").and.lengthOf(8);
        expect(SUT(-1.1e1, 3, 5)).is.eq("-11.0000").and.lengthOf(8);
        expect(SUT(1.1e-1, 3, 5)).is.eq("+0.11000").and.lengthOf(8);
        expect(SUT(-1.1e-1, 3, 5)).is.eq("-0.11000").and.lengthOf(8);

        expect(SUT(1.1e2, 3, 5)).is.eq("+110.000").and.lengthOf(8);
        expect(SUT(-1.1e2, 3, 5)).is.eq("-110.000").and.lengthOf(8);
        expect(SUT(1.1e-2, 3, 5)).is.eq("+0.01100").and.lengthOf(8);
        expect(SUT(-1.1e-2, 3, 5)).is.eq("-0.01100").and.lengthOf(8);

        expect(SUT(1.1e3, 3, 5)).is.eq("+1.100E3").and.lengthOf(8);
        expect(SUT(-1.1e3, 3, 5)).is.eq("-1.100E3").and.lengthOf(8);
        expect(SUT(1.1e-3, 3, 5)).is.eq("+1.10E-3").and.lengthOf(8);
        expect(SUT(-1.1e-3, 3, 5)).is.eq("-1.10E-3").and.lengthOf(8);

        expect(SUT(1.1e4, 3, 5)).is.eq("+1.100E4").and.lengthOf(8);
        expect(SUT(-1.1e4, 3, 5)).is.eq("-1.100E4").and.lengthOf(8);
        expect(SUT(1.1e-4, 3, 5)).is.eq("+1.10E-4").and.lengthOf(8);
        expect(SUT(-1.1e-4, 3, 5)).is.eq("-1.10E-4").and.lengthOf(8);

        expect(SUT(1.1e9, 3, 5)).is.eq("+1.100E9").and.lengthOf(8);
        expect(SUT(-1.1e9, 3, 5)).is.eq("-1.100E9").and.lengthOf(8);
        expect(SUT(1.1e-9, 3, 5)).is.eq("+1.10E-9").and.lengthOf(8);
        expect(SUT(-1.1e-9, 3, 5)).is.eq("-1.10E-9").and.lengthOf(8);

        expect(SUT(1.1e10, 3, 5)).is.eq("+1.10E10").and.lengthOf(8);
        expect(SUT(-1.1e10, 3, 5)).is.eq("-1.10E10").and.lengthOf(8);
        expect(SUT(1.1e-10, 3, 5)).is.eq("+1.1E-10").and.lengthOf(8);
        expect(SUT(-1.1e-10, 3, 5)).is.eq("-1.1E-10").and.lengthOf(8);
    });

    it("setup for long", () => {
        expect(SUT(1.1e1, 6, 11)).is.eq("+11.0000000000").and.lengthOf(14);
        expect(SUT(-1.1e1, 6, 11)).is.eq("-11.0000000000").and.lengthOf(14);
        expect(SUT(1.1e-1, 6, 11)).is.eq("+0.11000000000").and.lengthOf(14);
        expect(SUT(-1.1e-1, 6, 11)).is.eq("-0.11000000000").and.lengthOf(14);

        expect(SUT(1.1e2, 6, 11)).is.eq("+110.000000000").and.lengthOf(14);
        expect(SUT(-1.1e2, 6, 11)).is.eq("-110.000000000").and.lengthOf(14);
        expect(SUT(1.1e-2, 6, 11)).is.eq("+0.01100000000").and.lengthOf(14);
        expect(SUT(-1.1e-2, 6, 11)).is.eq("-0.01100000000").and.lengthOf(14);

        expect(SUT(1.1e3, 6, 11)).is.eq("+1100.00000000").and.lengthOf(14);
        expect(SUT(-1.1e3, 6, 11)).is.eq("-1100.00000000").and.lengthOf(14);
        expect(SUT(1.1e-3, 6, 11)).is.eq("+0.00110000000").and.lengthOf(14);
        expect(SUT(-1.1e-3, 6, 11)).is.eq("-0.00110000000").and.lengthOf(14);

        expect(SUT(1.1e4, 6, 11)).is.eq("+11000.0000000").and.lengthOf(14);
        expect(SUT(-1.1e4, 6, 11)).is.eq("-11000.0000000").and.lengthOf(14);
        expect(SUT(1.1e-4, 6, 11)).is.eq("+0.00011000000").and.lengthOf(14);
        expect(SUT(-1.1e-4, 6, 11)).is.eq("-0.00011000000").and.lengthOf(14);

        expect(SUT(1.1e5, 6, 11)).is.eq("+110000.000000").and.lengthOf(14);
        expect(SUT(-1.1e5, 6, 11)).is.eq("-110000.000000").and.lengthOf(14);
        expect(SUT(1.1e-5, 6, 11)).is.eq("+0.00001100000").and.lengthOf(14);
        expect(SUT(-1.1e-5, 6, 11)).is.eq("-0.00001100000").and.lengthOf(14);

        expect(SUT(1.1e6, 6, 11)).is.eq("+1.100000000E6").and.lengthOf(14);
        expect(SUT(-1.1e6, 6, 11)).is.eq("-1.100000000E6").and.lengthOf(14);
        expect(SUT(1.1e-6, 6, 11)).is.eq("+1.10000000E-6").and.lengthOf(14);
        expect(SUT(-1.1e-6, 6, 11)).is.eq("-1.10000000E-6").and.lengthOf(14);

        expect(SUT(1.1e7, 6, 11)).is.eq("+1.100000000E7").and.lengthOf(14);
        expect(SUT(-1.1e7, 6, 11)).is.eq("-1.100000000E7").and.lengthOf(14);
        expect(SUT(1.1e-7, 6, 11)).is.eq("+1.10000000E-7").and.lengthOf(14);
        expect(SUT(-1.1e-7, 6, 11)).is.eq("-1.10000000E-7").and.lengthOf(14);

        expect(SUT(1.1e9, 6, 11)).is.eq("+1.100000000E9").and.lengthOf(14);
        expect(SUT(-1.1e9, 6, 11)).is.eq("-1.100000000E9").and.lengthOf(14);
        expect(SUT(1.1e-9, 6, 11)).is.eq("+1.10000000E-9").and.lengthOf(14);
        expect(SUT(-1.1e-9, 6, 11)).is.eq("-1.10000000E-9").and.lengthOf(14);

        expect(SUT(1.1e10, 6, 11)).is.eq("+1.10000000E10").and.lengthOf(14);
        expect(SUT(-1.1e10, 6, 11)).is.eq("-1.10000000E10").and.lengthOf(14);
        expect(SUT(1.1e-10, 6, 11)).is.eq("+1.1000000E-10").and.lengthOf(14);
        expect(SUT(-1.1e-10, 6, 11)).is.eq("-1.1000000E-10").and.lengthOf(14);
    });
});

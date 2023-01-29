export const nformat = (v: number, fdigits: number, width: number) => {
    const n = v.toExponential().split("e");
    const ex = parseInt(n[1]);
    const absex = Math.abs(ex);
    const short = absex >= fdigits;
    const rest = short
        ? width - 3 + (absex >= 10 ? 0 : 1) - (ex < 0 ? 1 : 0)
        : width - absex + (ex < 0 ? -ex : 0);
    return v.toLocaleString(undefined, {
        signDisplay: "always",
        useGrouping: false,
        notation: short ? "scientific" : "standard",
        maximumFractionDigits: rest,
        minimumFractionDigits: rest
    });
};

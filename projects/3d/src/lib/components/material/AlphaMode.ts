export type AlphaMode =
    | "Disable"
    | "Add"
    | "Combine"
    | "Subtract"
    | "Multiply"
    | "Maximize"
    | "One"
    | "PreMultiplied"
    | "PreMultipliedPorterDuff"
    | "Interpolate"
    | "ScreenMode";

const mapping = [
    "Disable",
    "Add",
    "Combine",
    "Subtract",
    "Multiply",
    "Maximize",
    "One",
    "PreMultiplied",
    "PreMultipliedPorterDuff",
    "Interpolate",
    "ScreenMode"
] as const;

export const value = (mode: AlphaMode) => mapping.indexOf(mode);

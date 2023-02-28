type Types =
    | "text"
    | "color"
    | "number"
    | "select"
    | "range"
    | "toggle"
    | "tuple"
    | "object"
    | "custom";

type ColorFormat = "hsl" | "hsla" | "rgb" | "rgba" | "hex" | "hexa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
type Impl = (...args: Any[]) => Any;

// prettier-ignore
export type PropType<T extends Types> =
    T extends "custom" ? [
        [ name: string, type: T, impl: Impl ],
        { name: string; type: T; impl: Impl; }
    ]
    : T extends "text" ? [
        [ name: string, type: T ],
        { name: string; type: T; }
    ]
    : T extends "color" ? [
        [ name: string, type: T, format: ColorFormat ],
        { name: string; type: T; format: ColorFormat; }
    ]
    : T extends "number" ? [
        [ name: string, type: T ],
        { name: string; type: T; }
    ]
    : T extends "toggle" ? [
        [ name: string, type: T ],
        { name: string; type: T; }
    ]
    : T extends "select" ? [
        [ name: string, type: T, values: string[] ],
        { name: string; type: T; values: string[]; }
    ]
    : T extends "range" ? [
        [ name: string, type: T, min: number, max: number, step: number ],
        { name: string; type: T; min: number; max: number, step: number; }
    ]
    : T extends "tuple" ? [
        // eslint-disable-next-line no-use-before-define
        [ name: string, type: T, values: NonNamedProp[] ],
        // eslint-disable-next-line no-use-before-define
        { name: string; type: T; values: NonNamedProp[]; }
    ]
    : T extends "object" ? [
        // eslint-disable-next-line no-use-before-define
        [ name: string, type: T, values: Prop[] ],
        // eslint-disable-next-line no-use-before-define
        { name: string; type: T; values: Prop[]; }
    ]
    : never;

export type Flattened<T extends PropType> = T[0];
export type Detailed<T extends PropType> = T[1];
export type Unionized<T extends PropTyoe> = T[number];

// prettier-ignore
export type Prop =
    | [ name: string, type: "custom", impl: Impl ]
    | { name: string; type: "custom"; impl: Impl; }
    | [ name: string, type: "text" ]
    | { name: string; type: "text"; }
    | [ name: string, type: "color", format: ColorFormat ]
    | { name: string; type: "color"; format: ColorFormat; }
    | [ name: string, type: "number" ]
    | { name: string; type: "number"; }
    | [ name: string, type: "toggle" ]
    | { name: string; type: "toggle"; }
    | [ name: string, type: "select", values: string[] ]
    | { name: string; type: "select"; values: string[]; }
    | [ name: string, type: "range", min: number, max: number, step: number ]
    | { name: string; type: "range"; min: number; max: number; step: number; }
    // eslint-disable-next-line no-use-before-define
    | [ name: string, type: "tuple", values: NonNamedProp[] ]
    // eslint-disable-next-line no-use-before-define
    | { name: string; type: "tuple"; values: NonNamedProp[]; }
    | [ name: string, type: "object", values: Prop[] ]
    | { name: string; type: "object"; values: Prop[]; };

// prettier-ignore
export type NonNamedProp =
    | [ type: "custom", impl: Impl ]
    | { type: "custom"; impl: Impl; }
    | [ type: "text" ]
    | { type: "text"; }
    | [ type: "color", format: ColorFormat ]
    | { type: "color"; format: ColorFormat; }
    | [ type: "number" ]
    | { type: "number"; }
    | [ type: "toggle" ]
    | { type: "toggle"; }
    | [ type: "select", values: string[] ]
    | { type: "select"; values: string[]; }
    | [ type: "range", min: number, max: number, step: number ]
    | { type: "range"; min: number; max: number; step: number; }
    | [ type: "tuple", values: NonNamedProp[] ]
    | { type: "tuple"; values: NonNamedProp[]; }
    | [ type: "object", values: Prop[] ]
    | { type: "object"; values: Prop[]; };

// prettier-ignore
export type NonNamedValuedProp =
    | [ value: Any, type: "custom", impl: Impl ]
    | { value: Any; type: "custom"; impl: Impl; }
    | [ value: string, type: "text" ]
    | { value: string; type: "text"; }
    | [ value: string, type: "color", format: ColorFormat ]
    | { value: string; type: "color"; format: ColorFormat; }
    | [ value: number, type: "number" ]
    | { value: number; type: "number"; }
    | [ value: boolean, type: "toggle" ]
    | { value: boolean; type: "toggle"; }
    | [ value: string, type: "select", values: string[] ]
    | { value: string; type: "select"; values: string[]; }
    | [ value: number, type: "range", min: number, max: number, step: number ]
    | { value: number; type: "range"; min: number; max: number; step: number; }
    | [ value: Any[], type: "tuple", values: NonNamedProp[] ]
    | { value: Any[]; type: "tuple"; values: NonNamedProp[]; }
    | [ value: Record<string, Any>, type: "object", values: Prop[] ]
    | { value: Record<string, Any>; type: "object"; values: Prop[]; };
export type Event = string;

type Types = "text" | "number" | "select" | "range" | "switch" | "tuple" | "object";

// prettier-ignore
export type PropType<T extends Types> =
    T extends "text" ? [
        [ name: string, type: T ],
        { name: string; type: T; }
    ]
    : T extends "number" ? [
        [ name: string, type: T ],
        { name: string; type: T; }
    ]
    : T extends "switch" ? [
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
    | [ name: string, type: "text" ]
    | { name: string; type: "text"; }
    | [ name: string, type: "number" ]
    | { name: string; type: "number"; }
    | [ name: string, type: "switch" ]
    | { name: string; type: "switch"; }
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
type NonNamedProp =
    | [ type: "text" ]
    | { type: "text"; }
    | [ type: "number" ]
    | { type: "number"; }
    | [ type: "switch" ]
    | { type: "switch"; }
    | [ type: "select", values: string[] ]
    | { type: "select"; values: string[]; }
    | [ type: "range", min: number, max: number, step: number ]
    | { type: "range"; min: number; max: number; step: number; }
    | [ type: "tuple", values: NonNamedProp[] ]
    | { type: "tuple"; values: NonNamedProp[]; }
    | [ type: "object", values: Prop[] ]
    | { type: "object"; values: Prop[]; };

export type Event = string;

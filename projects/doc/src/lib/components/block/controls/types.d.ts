// eslint-disable-next-line no-use-before-define
export type FlatPropTuple = ["tuple", NonNamedProp[]];
// eslint-disable-next-line no-use-before-define
export type FlatPropObject = ["object", Prop[]];
export type FlatPropText = ["text"];
export type FlatPropNumber = ["number"];
export type FlatPropRange = ["range", number, number, number];
export type FlatPropSelect = ["select", string[]];
export type FlatPropSwitch = ["switch"];

// eslint-disable-next-line no-use-before-define
export type PropTuple = { type: "tuple" } & { values: NonNamedProp[] };
// eslint-disable-next-line no-use-before-define
export type PropObject = { type: "object" } & { values: Prop[] };
export type PropText = { type: "text" };
export type PropNumber = { type: "number" };
export type PropSwitch = { type: "switch" };
export type PropSelect = { type: "select" } & { values: string[] };
export type PropRange = { type: "range" } & { min: number; max: number; step: number };

export type Name = { name: string };

export type Prop =
    | (Name & PropTuple)
    | (Name & PropObject)
    | (Name & PropText)
    | (Name & PropNumber)
    | (Name & PropSwitch)
    | (Name & PropSelect)
    | (Name & PropRange)
    | [string, ...FlatPropTuple]
    | [string, ...FlatPropObject]
    | [string, ...FlatPropText]
    | [string, ...FlatPropNumber]
    | [string, ...FlatPropSwitch]
    | [string, ...FlatPropSelect]
    | [string, ...FlatPropRange];

type NonNamedProp =
    | PropTuple
    | PropObject
    | PropText
    | PropNumber
    | PropRange
    | PropSelect
    | PropSwitch
    | FlatPropTuple
    | FlatPropObject
    | FlatPropText
    | FlatPropNumber
    | FlatPropRange
    | FlatPropSelect
    | FlatPropSwitch;

export type Event = string;

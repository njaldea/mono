export type PropTuple = {
    name: string;
    type: "tuple";
    // eslint-disable-next-line no-use-before-define
    values: NonNamedProp[];
};

export type PropObject = {
    name: string;
    type: "object";
    // eslint-disable-next-line no-use-before-define
    values: Prop[];
};

export type PropText = {
    name: string;
    type: "text";
};

export type PropNumber = {
    name: string;
    type: "number";
};

export type PropRange = {
    name: string;
    type: "range";
    min: number;
    max: number;
    step: number;
};

export type PropSelect = {
    name: string;
    type: "select";
    values: string[];
};

export type PropSwitch = {
    name: string;
    type: "switch";
};

export type Prop =
    | PropTuple
    | PropObject
    | PropText
    | PropNumber
    | PropRange
    | PropSelect
    | PropSwitch;

type NonNamedProp =
    | Omit<PropTuple, "name">
    | Omit<PropObject, "name">
    | Omit<PropText, "name">
    | Omit<PropNumber, "name">
    | Omit<PropRange, "name">
    | Omit<PropSelect, "name">
    | Omit<PropSwitch, "name">;

export type Event = string;

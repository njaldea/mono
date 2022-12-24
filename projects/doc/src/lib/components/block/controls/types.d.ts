export type ControlTuple = {
    name: string;
    type: "tuple";
    // eslint-disable-next-line no-use-before-define
    values: NonNamedControl[];
};

export type ControlObject = {
    name: string;
    type: "object";
    // eslint-disable-next-line no-use-before-define
    values: Control[];
};

export type ControlText = {
    name: string;
    type: "text";
};

export type ControlNumber = {
    name: string;
    type: "number";
};

export type ControlRange = {
    name: string;
    type: "range";
    min: number;
    max: number;
    step: number;
};

export type ControlSelect = {
    name: string;
    type: "select";
    values: string[];
};

export type ControlSwitch = {
    name: string;
    type: "switch";
};

export type Control =
    | ControlTuple
    | ControlObject
    | ControlText
    | ControlNumber
    | ControlRange
    | ControlSelect
    | ControlSwitch;

type NonNamedControl =
    | Omit<ControlTuple, "name">
    | Omit<ControlObject, "name">
    | Omit<ControlText, "name">
    | Omit<ControlNumber, "name">
    | Omit<ControlRange, "name">
    | Omit<ControlSelect, "name">
    | Omit<ControlSwitch, "name">;

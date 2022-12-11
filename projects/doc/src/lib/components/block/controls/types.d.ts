export type NonNamed<T> = Omit<T, "name">;
export type NonNamedControl =
    | NonNamed<ControlTuple>
    | NonNamed<ControlObject>
    | NonNamed<ControlText>
    | NonNamed<ControlNumber>
    | NonNamed<ControlRange>
    | NonNamed<ControlSelect>
    | NonNamed<ControlSwitch>;

export type ControlTuple = {
    name: string;
    type: "tuple";
    values: NonNamedControl[];
};

export type ControlObject = {
    name: string;
    type: "object";
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

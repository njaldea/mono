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

export type Control = ControlText | ControlNumber | ControlRange | ControlSelect | ControlSwitch;

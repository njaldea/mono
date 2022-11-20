type EventDetail = {
    [key: string]: unknown;
};

export type Event = {
    name: string;
    detail: EventDetail;
};

export type Events = Event[];

export type ControlNumber = {
    name: string;
    type: "number";
    min: number;
    max: number;
    step: number;
};

export type ControlText = {
    name: string;
    type: "text";
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

export type Control = ControlNumber | ControlText | ControlSelect | ControlSwitch;

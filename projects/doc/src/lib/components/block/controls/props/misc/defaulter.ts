import type { ValueType } from "../../../types";
import type {
    Prop,
    PropNumber,
    PropRange,
    PropSelect,
    PropSwitch,
    PropText,
    PropTuple,
    PropObject
} from "../../types";

export function getDefault(i: PropTuple): ValueType[];
export function getDefault(i: PropObject): Record<string, ValueType>;
export function getDefault(i: PropNumber): number;
export function getDefault(i: PropRange): number;
export function getDefault(i: PropSelect): string;
export function getDefault(i: PropText): string;
export function getDefault(i: PropSwitch): boolean;
export function getDefault(i: Prop): ValueType;
// eslint-disable-next-line func-style
export function getDefault(i: Prop): ValueType {
    switch (i.type) {
        case "object":
            // eslint-disable-next-line no-use-before-define
            return getObjectDefaults(i);
        case "tuple":
            // eslint-disable-next-line no-use-before-define
            return getTupleDefaults(i);
        case "text":
            return "";
        case "select":
            return i.values.length > 0 ? i.values[0] : "";
        case "number":
            return 0;
        case "range":
            return i.min;
        case "switch":
        default:
            return false;
    }
}

const getObjectDefaults = (info: PropObject) => {
    const ret: Record<string, ValueType> = {};
    for (const i of info.values) {
        ret[i.name] = getDefault(i);
    }
    return ret;
};

const getTupleDefaults = (i: PropTuple) => {
    const ret: ValueType[] = [];
    for (const info of i.values) {
        ret.push(getDefault(info as Prop));
    }
    return ret;
};

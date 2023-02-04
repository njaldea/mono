import type { Detailed, Unionized, PropType, Prop, NonNamedProp } from "../../types";

type TypesWithValue = "object" | "tuple" | "select";
type Values<T extends TypesWithValue> = Detailed<PropType<T>>["values"];

export function getValues(info: Unionized<PropType<"select">>): Values<"select">;
export function getValues(info: Unionized<PropType<"object">>): Values<"object">;
export function getValues(info: Unionized<PropType<"tuple">>): Values<"tuple">;
// eslint-disable-next-line func-style
export function getValues(
    info: Unionized<PropType<TypesWithValue>>
): Detailed<PropType<TypesWithValue>>["values"] {
    if (info instanceof Array) {
        return info[2];
    }
    return info.values;
}

export const getMin = (info: Unionized<PropType<"range">>): number => {
    if (info instanceof Array) {
        return info[2];
    }
    return info.min;
};

export const getType = (info: Prop) => {
    if (info instanceof Array) {
        return info[1];
    }
    return info.type;
};

export const getName = (info: Prop) => {
    if (info instanceof Array) {
        return info[0];
    }
    return info.name;
};

export const addName = (name: string, info: NonNamedProp): Prop => {
    if (info instanceof Array) {
        return [name, ...info];
    }
    return { ...info, name };
};

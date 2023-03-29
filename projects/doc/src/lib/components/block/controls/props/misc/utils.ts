import type { Detailed, Unionized, PropType, Prop, NonNamedProp, SpecialProp } from "../../types";

type TypesWithValue = "object" | "tuple" | "select";
type Values<T extends TypesWithValue> = Detailed<PropType<T>>["values"];

export function getValues(info: Unionized<PropType<"select">>): Values<"select">;
export function getValues(info: Unionized<PropType<"object">>): Values<"object">;
export function getValues(info: Unionized<PropType<"tuple">>): Values<"tuple">;
// eslint-disable-next-line func-style
export function getValues(
    info: Unionized<PropType<TypesWithValue>>
): Detailed<PropType<TypesWithValue>>["values"] {
    return info instanceof Array ? info[2] : info.values;
}

export const getMin = (info: Unionized<PropType<"range">>): number => {
    return info instanceof Array ? info[2] : info.min;
};

export const getType = (info: Prop | SpecialProp) => {
    return info instanceof Array ? info[1] : info.type;
};

export const getFormat = (info: Unionized<PropType<"color">>) => {
    return info instanceof Array ? info[2] : info.format;
};

export const getName = (info: Prop | SpecialProp) => {
    return info instanceof Array ? info[0] : info.name;
};

export const getClick = (info: SpecialProp) => {
    return info instanceof Array ? info[2] : info.click;
};

export const addName = (name: string, info: NonNamedProp): Prop => {
    return info instanceof Array ? [name, ...info] : { name, ...info };
};

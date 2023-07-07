type GroupType = "map" | "list" | "tuple" | "object";

type ValidateTuple<Input, Types extends string> = Input extends readonly []
    ? Input
    : Input extends readonly [infer First, ...infer Rest]
    ? readonly [Exclude<Types, GroupType>, ...ValidateTuple<Rest, Types>]
    : never;

type ValidateObjectKey<T, Types extends string> = T extends string
    ? T extends `${infer Key}:${string}`
        ? T extends `${string}:${Types}`
            ? T
            : `${Key}:${Types}`
        : { __error: "expecting type in `key:type` format" }
    : never;

type ValidateObject<Input, Types extends string> = Input extends readonly []
    ? Input
    : Input extends readonly [infer First, ...infer Rest]
    ? readonly [
          ValidateObjectKey<First, Exclude<Types, GroupType | symbol>>,
          ...ValidateObject<Rest, Types>
      ]
    : never;

export type ValidateNode<Input, Type extends GroupType, Types extends string> = Type extends
    | "map"
    | "list"
    ? Types
    : Type extends "tuple"
    ? ValidateTuple<Input, Types>
    : Type extends "object"
    ? ValidateObject<Input, Types>
    : never;

type ValidateTypeItem<Input, Types extends string> = Input extends { type: infer Type }
    ? Type extends "map" | "list"
        ? { type: Type; value: Types }
        : Type extends "tuple"
        ? Input extends { value: infer Value }
            ? { type: Type; value: ValidateTuple<Value, Types> }
            : { type: Type; value: readonly Types[] }
        : Type extends "object"
        ? Input extends { value: infer Value }
            ? { type: Type; value: ValidateObject<Value, Types> }
            : { type: Type; value: readonly `${string}:${Types}`[] }
        : Type extends Types
        ? { type: Type }
        : { type: Types | GroupType }
    : { type: Types | GroupType };

export type ValidateType<Input, Types extends string> = Input extends readonly []
    ? Input
    : Input extends readonly [infer First, ...infer Rest]
    ? readonly [ValidateTypeItem<First, Types>, ...ValidateType<Rest, Types>]
    : never;

export type ValidateAlias<Type extends string, Reserved, Registered> = Type extends Reserved
    ? { __error: `${Type} is reserved` }
    : Type extends Registered
    ? { __error: `${Type} is already registered` }
    : Type;

import type { GroupType, Unalias } from "./utils";

type ValidateTuple<Input, Types extends string> = Input extends readonly []
    ? Input
    : Input extends readonly [infer First, ...infer Rest]
    ? readonly [First extends Types ? First : Types, ...ValidateTuple<Rest, Types>]
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
    ? readonly [ValidateObjectKey<First, Types>, ...ValidateObject<Rest, Types>]
    : never;

/**
 * builder.node - group type
 */
export type ValidateContent<Input, Type extends GroupType, Types extends string> = Type extends
    | "map"
    | "list"
    ? Input extends Types
        ? Input
        : Types
    : Type extends "tuple"
    ? ValidateTuple<Input, Types>
    : Type extends "object"
    ? ValidateObject<Input, Types>
    : never;

/**
 * builder.node - non-group type
 */
export type ValidateRefs<Input, Types extends string> = ValidateTuple<Input, Types>;

type ValidateTypeItem<Input, Types extends string> = Input extends { type: infer Type }
    ? Type extends "map" | "list"
        ? { type: Type; content: Types }
        : Type extends "tuple"
        ? Input extends { content: infer Content }
            ? { type: Type; content: ValidateTuple<Content, Types> }
            : { type: Type; content: readonly Types[] }
        : Type extends "object"
        ? Input extends { content: infer Content }
            ? { type: Type; content: ValidateObject<Content, Types> }
            : { type: Type; content: readonly `${string}:${Types}`[] }
        : Type extends Types
        ? { type: Type }
        : { type: (Unalias & { input: Types | GroupType })["output"] }
    : { type: (Unalias & { input: Types | GroupType })["output"] };

/**
 * builder.type
 */
export type ValidateType<Input, Types extends string> = Input extends readonly []
    ? Input
    : Input extends readonly [infer First, ...infer Rest]
    ? readonly [ValidateTypeItem<First, Types>, ...ValidateType<Rest, Types>]
    : never;

/**
 * builder.type
 * buidler.node
 */
export type ValidateAlias<Type extends string, Reserved, Registered> = Type extends Reserved
    ? { __error: `${Type} is reserved` }
    : Type extends Registered
    ? { __error: `${Type} is already registered` }
    : Type;

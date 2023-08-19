import type { GroupType, Indexify, Prettify, Action } from "./utils";

type ResolveTuple<Value, Types> = Value extends readonly []
    ? Value
    : Value extends readonly [infer First, ...infer Rest]
    ? readonly [First extends keyof Types ? Types[First] : never, ...ResolveTuple<Rest, Types>]
    : never;

type ResolveObjectKey<Value, Types> = Value extends `${infer Key}:${infer Type}`
    ? Type extends keyof Types
        ? { readonly [K in Key]: Types[Type] }
        : never
    : never;

type ResolveObject<Value, Types> = Value extends readonly [infer First, ...infer Rest]
    ? (Prettify & { input: ResolveObjectKey<First, Types> & ResolveObject<Rest, Types> })["output"]
    : object;

/**
 * Info can be { type: string } or { type: string; value: ...[] }
 */
type ResolveInfo<Info, Types> = Info extends { type: infer Type }
    ? Type extends keyof Types
        ? Types[Type]
        : Info extends { content: infer Content extends keyof Types }
        ? Type extends "map"
            ? // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
              { readonly [key: string]: Types[Content] }
            : Type extends "list"
            ? readonly Types[Content][]
            : never
        : Info extends { content: infer Content }
        ? Type extends "tuple"
            ? ResolveTuple<Content, Types>
            : Type extends "object"
            ? (Prettify & { input: ResolveObject<Content, Types> })["output"]
            : never
        : never
    : never;

/**
 * to be used by builder.type where detail is the array of { type: string; value?: ...[] }
 */
export type ResolveTypes<Detail, Types> = Detail extends readonly [infer First, ...infer Rest]
    ? ResolveInfo<First, Types> | ResolveTypes<Rest, Types>
    : never;

/**
 * to be used by builder.node where detail can be:
 *  -  Refs for non group types
 *  -  Value from group types
 */
export type ResolveType<Type, Content, Types> = Type extends GroupType
    ? ResolveInfo<{ type: Type; content: Content }, Types>
    : ResolveInfo<{ type: Type }, Types>;

type Resolve<Type, Types> = Type extends keyof Types ? Types[Type] : never;

type GenAction<Key, Context, Value, Primes, Types> = Key extends Exclude<keyof Types, Primes>
    ? { readonly [K in Key]: (Action & { context: Context; value: Value })["output"] }
    : // eslint-disable-next-line @typescript-eslint/ban-types
      {};

interface RefActions {
    output: this extends {
        type: infer Type;
        info: infer Info;
        context: infer Context;
        types: infer Types;
        primes: infer Primes;
    }
        ? Type extends "map" | "list"
            ? GenAction<Info, Context, ResolveInfo<{ type: Info }, Types>, Primes, Types>
            : Info extends readonly [infer First, ...infer Rest]
            ? Type extends "tuple"
                ? GenAction<First, Context, ResolveInfo<{ type: First }, Types>, Primes, Types> &
                      (RefActions & {
                          type: Type;
                          info: Rest;
                          context: Context;
                          types: Types;
                          primes: Primes;
                      })["output"]
                : Type extends "object"
                ? First extends `${string}:${infer T}`
                    ? GenAction<T, Context, ResolveInfo<{ type: T }, Types>, Primes, Types> &
                          (RefActions & {
                              type: Type;
                              info: Rest;
                              context: Context;
                              types: Types;
                              primes: Primes;
                          })["output"]
                    : // eslint-disable-next-line @typescript-eslint/ban-types
                      {}
                : // eslint-disable-next-line @typescript-eslint/ban-types
                  {}
            : // eslint-disable-next-line @typescript-eslint/ban-types
              {}
        : never;
}

type AutoArg<Type, Value> = Type extends "tuple"
    ? Indexify<Value>
    : Type extends "list"
    ? number
    : Type extends "object"
    ? keyof Value
    : Type extends "map"
    ? string
    : never;

interface AutoAction {
    output: this extends {
        context: infer Context;
        key: infer Key;
        value: infer Value;
    }
        ? (
              create: (key: Key) => Context,
              destroy: (key: Key) => void,
              value: Value
          ) => {
              update: (value: Value) => void;
              destroy: () => void;
          }
        : never;
}

export interface ResolveAction {
    output: this extends {
        context: infer Context;
        refs: infer Refs;
        type: infer Type;
        types: infer Types;
        primes: infer Primes;
    }
        ? (detail: {
              context: Context;
              value: Resolve<Type, Types>;
              /**
               * Additional actions available for use
               */
              refs: (Prettify & {
                  input: (RefActions & {
                      context: Context;
                      type: "tuple";
                      info: Refs;
                      types: Types;
                      primes: Primes;
                  })["output"];
              })["output"];
          }) => {
              update: (value: Resolve<Type, Types>) => void;
              destroy: () => void;
          }
        : never;
}

export interface ResolveGroupAction {
    output: this extends {
        type: infer Type;
        context: infer Context;
        types: infer Types;
        content: infer Content;
        primes: infer Primes;
    }
        ? (args: {
              context: Context;
              /**
               * Some metadata that can be used by the user
               *
               * keys  - union of valid keys. intended to help type annotations especially for auto action.
               *
               * value - exactly the same value provided to the action
               */
              meta: {
                  keys: AutoArg<Type, ResolveType<Type, Content, Types>>;
                  content: Content;
              };
              value: ResolveType<Type, Content, Types>;
              /**
               * Additional actions available for use
               */
              refs: (Prettify & {
                  input: (RefActions & {
                      context: Context;
                      type: Type;
                      info: Content;
                      types: Types;
                      primes: Primes;
                  })["output"];
              })["output"];
              /**
               * A method to delegate action propagation to jwalk.
               */
              auto: (AutoAction & {
                  key: AutoArg<Type, ResolveType<Type, Content, Types>>;
                  context: Context;
                  value: ResolveType<Type, Content, Types>;
              })["output"];
          }) => {
              update: (value: ResolveType<Type, Content, Types>) => void;
              destroy: () => void;
          }
        : never;
}

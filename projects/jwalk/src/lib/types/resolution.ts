import type { Prettify } from "./utils";

type ResolveTuple<Value, Types> = Value extends readonly []
    ? Value
    : Value extends readonly [infer First, ...infer Rest]
    ? [First extends keyof Types ? Types[First] : never, ...ResolveTuple<Rest, Types>]
    : never;

type ResolveObjectKey<Value, Types> = Value extends `${infer Key}:${infer Type}`
    ? Type extends keyof Types
        ? { [K in Key]: Types[Type] }
        : never
    : never;

type ResolveObject<Value, Types> = Value extends readonly [infer First, ...infer Rest]
    ? (Prettify & { input: ResolveObjectKey<First, Types> & ResolveObject<Rest, Types> })["output"]
    : object;

type ResolveInfo<Info, Types> = Info extends { type: infer Type }
    ? Type extends keyof Types
        ? Types[Type]
        : Info extends { value: infer Value extends keyof Types }
        ? Type extends "map"
            ? Record<string, Types[Value]>
            : Type extends "list"
            ? readonly Types[Value][]
            : never
        : Info extends { value: infer Value }
        ? Type extends "tuple"
            ? ResolveTuple<Value, Types>
            : Type extends "object"
            ? (Prettify & { input: ResolveObject<Value, Types> })["output"]
            : never
        : never
    : never;

export type ResolveTypes<Detail, Types> = Detail extends readonly [infer First, ...infer Rest]
    ? ResolveInfo<First, Types> | ResolveTypes<Rest, Types>
    : never;

export type ResolveType<Type, Detail, Types> = ResolveInfo<{ type: Type; value: Detail }, Types>;

type Resolve<Type, Types> = Type extends keyof Types ? Types[Type] : never;

interface Action {
    output: this extends {
        context: infer Context;
        value: infer Value;
    }
        ? (
              context: Context,
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
        types: infer Types;
        type: infer Type;
    }
        ? (
              context: Context,
              detail: { value: Resolve<Type, Types> }
          ) => {
              update: (value: Resolve<Type, Types>) => void;
              destroy: () => void;
          }
        : never;
}

type GenAction<Key, Context, Value, Primes, Types> = Key extends Exclude<keyof Types, Primes>
    ? { [K in Key]: (Action & { context: Context; value: Value })["output"] }
    : // eslint-disable-next-line @typescript-eslint/ban-types
      {};

interface GenActions {
    output: this extends {
        type: infer Type;
        value: infer Value;
        context: infer Context;
        types: infer Types;
        primes: infer Primes;
    }
        ? Type extends "map" | "list"
            ? GenAction<Value, Context, ResolveInfo<{ type: Value }, Types>, Primes, Types>
            : Value extends readonly [infer First, ...infer Rest]
            ? Type extends "tuple"
                ? GenAction<
                      First,
                      Context,
                      ResolveInfo<{ type: Value; value: Value }, Types>,
                      Primes,
                      Types
                  > &
                      (GenActions & {
                          type: Type;
                          value: Rest;
                          context: Context;
                          types: Types;
                          primes: Primes;
                      })["output"]
                : Type extends "object"
                ? First extends `${string}:${infer T}`
                    ? GenAction<
                          T,
                          Context,
                          ResolveInfo<{ type: T; value: Value }, Types>,
                          Primes,
                          Types
                      > &
                          (GenActions & {
                              type: Type;
                              value: Rest;
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

type AutoArg<Type> = Type extends "tuple" | "list"
    ? number
    : Type extends "map" | "object"
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
              destroy: (context: Context) => void,
              value: Value
          ) => {
              update: (value: Value) => void;
              destroy: () => void;
          }
        : never;
}

interface PassAction {
    output: this extends {
        context: infer Context;
        value: infer Value;
    }
        ? (
              context: Context,
              value: Value
          ) => {
              update: (value: Value) => void;
              destroy: () => void;
          }
        : never;
}

export interface ResolveGroupAction {
    output: this extends {
        type: infer Type;
        context: infer Context;
        types: infer Types;
        value: infer Value;
        primes: infer Primes;
    }
        ? (
              context: Context,
              detail: {
                  value: ResolveType<Type, Value, Types>;
                  /**
                   * refs docs
                   */
                  refs: (Prettify & {
                      input: (GenActions & {
                          type: Type;
                          value: Value;
                          context: Context;
                          types: Types;
                          primes: Primes;
                      })["output"];
                  })["output"];
                  /**
                   * pass docs
                   */
                  pass: (PassAction & {
                      context: Context;
                      value: ResolveType<Type, Value, Types>;
                  })["output"];
                  /**
                   * auto docs
                   */
                  auto: (AutoAction & {
                      key: AutoArg<Type>;
                      context: Context;
                      value: ResolveType<Type, Value, Types>;
                  })["output"];
              }
          ) => {
              update: (value: ResolveType<Type, Value, Types>) => void;
              destroy: () => void;
          }
        : never;
}

import type { Prettify, Iterate, OPArrayed, OPAnd } from "./utils";

export type Action<Context, Value> = (
    context: Context,
    value: Value
) => {
    readonly update: (value: Value) => void;
    readonly destroy: () => void;
};

interface ActionItem {
    output: this extends {
        context: infer Context;
        key: infer Key;
        type: infer Type;
        value: infer Value;
    }
        ? {
              readonly key: Key;
              readonly type: Type;
              readonly action: (
                  context: Context,
                  value: Value
              ) => {
                  readonly update: (value: Value) => void;
                  readonly destroy: () => void;
              };
          }
        : never;
}

export type TupleActions<Context> = readonly (ActionItem & {
    context: Context;
    key: number;
    type: string;
    value: unknown;
})["output"][];

export type ObjectActions<Context> = readonly (ActionItem & {
    context: Context;
    key: string;
    type: string;
    value: unknown;
})["output"][];

export type GetProp<
    Primes,
    Types,
    Type,
    Prop extends "base" | "type" | "fields" | "value"
> = Type extends keyof Primes
    ? Prop extends "value"
        ? Primes[Type]
        : Prop extends "base" | "type"
        ? Type
        : never
    : Type extends keyof Types
    ? Prop extends keyof Types[Type]
        ? Types[Type][Prop]
        : never
    : never;

interface TupleValuefy {
    output: this extends {
        primes: infer Primes;
        types: infer Types;
        input: infer Input;
    }
        ? Input extends { readonly type: infer Type; value: infer Value }
            ? // eslint-disable-next-line no-use-before-define
              (Valuefy & {
                  primes: Primes;
                  types: Types;
                  type: GetProp<Primes, Types, Type, "base">;
                  value: Value;
              })["output"]
            : Input extends { readonly type: infer Type }
            ? GetProp<Primes, Types, Type, "value">
            : never
        : never;
}

interface ObjectValuefy {
    output: this extends {
        primes: infer Primes;
        types: infer Types;
        input: infer Input;
    }
        ? Input extends {
              readonly type: infer Type;
              readonly key: infer Key extends string;
              value: infer Value;
          }
            ? {
                  // eslint-disable-next-line no-use-before-define
                  readonly [K in Key]: (Valuefy & {
                      primes: Primes;
                      types: Types;
                      type: GetProp<Primes, Types, Type, "base">;
                      value: Value;
                  })["output"];
              }
            : Input extends { readonly type: infer Type; readonly key: infer Key extends string }
            ? { readonly [K in Key]: GetProp<Primes, Types, Type, "value"> }
            : never
        : never;
}

interface Valuefy {
    output: this extends {
        primes: infer Primes;
        types: infer Types;
        type: infer Type;
        value: infer Value;
    }
        ? Type extends "tuple"
            ? (Iterate & {
                  input: Value;
                  pred: TupleValuefy;
                  op: OPArrayed;
                  forward: { primes: Primes; types: Types };
              })["output"]
            : Type extends "object"
            ? (Iterate & {
                  input: Value;
                  pred: ObjectValuefy;
                  op: OPAnd;
                  forward: { primes: Primes; types: Types };
              })["output"]
            : GetProp<Primes, Types, Type, "value">
        : never;
}

type EvalValue<Value, Valid, Invalid> = [Value] extends [never]
    ? Invalid
    : Value extends readonly unknown[]
    ? number extends Value["length"]
        ? Invalid
        : Valid
    : Invalid;

type IAction<Context, Value> = (
    context: Context,
    detail: { readonly value: Value }
) => {
    readonly update: (value: Value) => void;
    readonly destroy: () => void;
};

// TupleAction / ObjectAction / KnownActions
// TODO: move to a common place
interface TupleAction {
    output: this extends {
        context: infer Context;
        primes: infer Primes;
        types: infer Types;
        input: infer Input;
        index: infer Index;
    }
        ? Input extends { type: infer Type }
            ? (ActionItem & {
                  context: Context;
                  key: Index;
                  type: Type;
                  value: GetProp<Primes, Types, Type, "value">;
              })["output"]
            : never
        : never;
}

interface ObjectAction {
    output: this extends {
        context: infer Context;
        primes: infer Primes;
        types: infer Types;
        input: infer Input;
    }
        ? Input extends { readonly type: infer Type; readonly key: infer Key }
            ? (ActionItem & {
                  context: Context;
                  key: Key;
                  type: Type;
                  value: GetProp<Primes, Types, Type, "value">;
              })["output"]
            : never
        : never;
}

interface KnownActions {
    output: this extends {
        context: infer Context;
        type: infer Type extends "tuple" | "object";
        types: infer Types;
        primes: infer Primes;
        value: infer Value;
    }
        ? Type extends "object"
            ? (Iterate & {
                  input: Value;
                  pred: ObjectAction;
                  op: OPArrayed;
                  forward: { context: Context; types: Types; primes: Primes };
              })["output"]
            : Type extends "tuple"
            ? (Iterate & {
                  input: Value;
                  pred: TupleAction;
                  op: OPArrayed;
                  forward: { context: Context; types: Types; primes: Primes };
              })["output"]
            : never
        : never;
}

interface UnknownActions {
    output: this extends {
        context: infer Context;
        type: infer Type extends "tuple" | "object";
    }
        ? Type extends "tuple"
            ? TupleActions<Context>
            : Type extends "object"
            ? ObjectActions<Context>
            : never
        : never;
}

interface ActionTypeImpl {
    output: this extends {
        type: infer Type;
        primes: infer Primes;
        types: infer Types;
        value: infer Value;
        context: infer Context;
    }
        ? Type extends Exclude<keyof Primes, "tuple" | "object">
            ? IAction<Context, GetProp<Primes, Types, Type, "value">>
            : Type extends "tuple" | "object"
            ? [Value] extends [never]
                ? (
                      context: Context,
                      detail: {
                          readonly value: GetProp<Primes, Types, Type, "value">;
                          readonly actions: (UnknownActions & {
                              context: Context;
                              type: Type;
                          })["output"];
                          readonly action: Action<Context, GetProp<Primes, Types, Type, "value">>;
                      }
                  ) => ReturnType<IAction<Context, GetProp<Primes, Types, Type, "value">>>
                : (
                      context: Context,
                      detail: {
                          readonly value: (Valuefy & {
                              primes: Primes;
                              types: Types;
                              type: Type;
                              value: Value;
                          })["output"];
                          readonly actions: (KnownActions & {
                              primes: Primes;
                              context: Context;
                              type: Type;
                              types: Types;
                              value: Value;
                          })["output"];
                          readonly action: Action<
                              Context,
                              (Valuefy & {
                                  primes: Primes;
                                  types: Types;
                                  type: Type;
                                  value: Value;
                              })["output"]
                          >;
                      }
                  ) => ReturnType<
                      IAction<
                          Context,
                          (Valuefy & {
                              primes: Primes;
                              types: Types;
                              type: Type;
                              value: Value;
                          })["output"]
                      >
                  >
            : never
        : never;
}
export interface ActionType {
    output: this extends {
        type: infer Type;
        primes: infer Primes;
        types: infer Types;
        value: infer Value;
        context: infer Context;
    }
        ? (ActionTypeImpl & {
              primes: Primes;
              types: Types;
              context: Context;
              type: GetProp<Primes, Types, Type, "base">;
              value: EvalValue<Value, Value, never>;
          })["output"]
        : never;
}

export interface ValueType {
    output: this extends {
        primes: infer Primes;
        types: infer Types;
        type: infer Type;
    }
        ? "value" extends GetProp<Primes, Types, Type, "fields">
            ? { __error: "Already has value" }
            : GetProp<Primes, Types, Type, "base"> extends "tuple"
            ? readonly {
                  type: keyof Primes | keyof Types;
                  key?: { __error: "tuples does not need a key" };
              }[]
            : GetProp<Primes, Types, Type, "base"> extends "object"
            ? readonly { type: keyof Primes | keyof Types; key: string }[]
            : never
        : never;
}

export interface AddTypes {
    output: this extends {
        key: infer Key extends string;
        primes: infer Primes;
        types: infer Types;
        type: infer Type;
        value: infer Value;
    }
        ? (Prettify & {
              input: Types & {
                  [K in Key]: {
                      type: GetProp<Primes, Types, Type, "type"> | Type;
                      base: GetProp<Primes, Types, Type, "base">;
                      fields:
                          | GetProp<Primes, Types, Type, "fields">
                          | EvalValue<Value, "value", never>;
                      value: EvalValue<
                          Value,
                          (Valuefy & {
                              primes: Primes;
                              types: Types;
                              type: GetProp<Primes, Types, Type, "base">;
                              value: Value;
                          })["output"],
                          GetProp<Primes, Types, Type, "value">
                      >;
                  };
              };
          })["output"]
        : never;
}

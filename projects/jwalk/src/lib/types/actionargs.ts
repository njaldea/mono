import type { Iterate, OPAnd, OPArrayed } from "./utils";

export interface ActionReturn {
    output: this extends {
        value: infer Value;
    }
        ? {
              readonly update: (value: Value) => void;
              readonly destroy: () => void;
          }
        : never;
}

export interface Action {
    output: this extends {
        context: infer Context;
        value: infer Value;
    }
        ? (context: Context, value: Value) => (ActionReturn & { value: Value })["output"]
        : never;
}

export interface ActionItem {
    output: this extends {
        context: infer Context;
        key: infer Key;
        type: infer Type;
        value: infer Value;
    }
        ? {
              readonly key: Key;
              readonly type: Type;
              readonly action: (Action & { context: Context; value: Value })["output"];
          }
        : never;
}

// move to utilities
export type GetValue<Input, Primes, Types> = Input extends keyof Primes
    ? Primes[Input]
    : Input extends keyof Types
    ? Types[Input]
    : never;

interface TupleValuefy {
    output: this extends {
        primes: infer Primes;
        types: infer Types;
        input: infer Input;
    }
        ? GetValue<Primes, Types, Input>
        : never;
}

interface ObjectValuefy {
    output: this extends {
        primes: infer Primes;
        types: infer Types;
        input: infer Input;
    }
        ? Input extends `${infer Key}:${infer Type}`
            ? { readonly [K in Key]: GetValue<Type, Primes, Types> }
            : never
        : never;
}

export interface Valuefy {
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
            : Type extends "list"
            ? readonly GetValue<Value, Primes, Types>[]
            : Type extends "map"
            ? Record<string, GetValue<Value, Primes, Types>>
            : GetValue<Type, Primes, Types>
        : never;
}

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
                  value: GetValue<Type, Primes, Types>;
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
                  value: GetValue<Type, Primes, Types>;
              })["output"]
            : never
        : never;
}

export interface ValueActions {
    output: this extends {
        primes: infer Primes;
        types: infer Types;
        type: infer Type;
        value: infer Value;
    }
        ? {
              readonly value: (Valuefy & {
                  primes: Primes;
                  types: Types;
                  type: Type;
                  value: Value;
              })["output"];
          }
        : never;
}

export interface ManualActions {
    output: this extends {
        primes: infer Primes;
        types: infer Types;
        type: infer Type;
        value: infer Value;
        context: infer Context;
    }
        ? Type extends "tuple"
            ? {
                  /**
                   * tuple doc
                   */
                  readonly items: (Iterate & {
                      input: Value;
                      pred: TupleAction;
                      op: OPArrayed;
                      forward: { context: Context; types: Types; primes: Primes };
                  })["output"];
              }
            : Type extends "object"
            ? {
                  /**
                   * object doc
                   */
                  readonly items: (Iterate & {
                      input: Value;
                      pred: ObjectAction;
                      op: OPArrayed;
                      forward: { context: Context; types: Types; primes: Primes };
                  })["output"];
              }
            : Type extends "map"
            ? {
                  /**
                   * map doc
                   */
                  readonly item: (Action & {
                      context: Context;
                      value: GetValue<Value, Primes, Types>;
                  })["output"];
              }
            : Type extends "list"
            ? {
                  /**
                   * list doc
                   */
                  readonly item: (Action & {
                      context: Context;
                      value: GetValue<Value, Primes, Types>;
                  })["output"];
              }
            : never
        : never;
}

export interface AutoActions {
    output: this extends {
        type: infer Type;
        primes: infer Primes;
        types: infer Types;
        value: infer Value;
        context: infer Context;
    }
        ? Type extends "tuple"
            ? {
                  /**
                   * tuple doc
                   */
                  readonly tuple: (Action & {
                      context: Context;
                      value: (Valuefy & {
                          primes: Primes;
                          types: Types;
                          type: Type;
                          value: Value;
                      })["output"];
                  })["output"];
              }
            : Type extends "object"
            ? {
                  /**
                   * object doc
                   */
                  readonly object: (Action & {
                      context: Context;
                      value: (Valuefy & {
                          primes: Primes;
                          types: Types;
                          type: Type;
                          value: Value;
                      })["output"];
                  })["output"];
              }
            : Type extends "map"
            ? {
                  /**
                   * map doc
                   */
                  readonly map: (Action & {
                      context: Context;
                      value: (Valuefy & {
                          primes: Primes;
                          types: Types;
                          type: Type;
                          value: Value;
                      })["output"];
                  })["output"];
              }
            : Type extends "list"
            ? {
                  /**
                   * list doc
                   */
                  readonly list: (Action & {
                      context: Context;
                      value: (Valuefy & {
                          primes: Primes;
                          types: Types;
                          type: Type;
                          value: Value;
                      })["output"];
                  })["output"];
              }
            : never
        : never;
}

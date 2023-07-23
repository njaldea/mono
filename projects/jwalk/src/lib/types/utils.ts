export type GroupType = "list" | "map" | "tuple" | "object";

/**
 * to spread an object to merge all objects combined by &
 */
export interface Prettify {
    output: this extends { input: infer Input }
        ? Input extends Record<string, unknown>
            ? { [K in keyof Input]: Input[K] }
            : Input
        : never;
}

type WrapInObject<T> = T extends any ? { key: T } : never;
type Unwrap<T> = T extends { key: infer V } ? V : never;

/**
 * to spread a union and avoid showing alias in intellisense
 */
export interface Unalias {
    output: this extends {
        input: infer Input;
    }
        ? Unwrap<WrapInObject<Input>>
        : never;
}

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

export type Indexify<V> = V extends readonly []
    ? V["length"]
    : V extends readonly [unknown, ...infer Rest]
    ? Rest["length"] | Indexify<Rest>
    : never;

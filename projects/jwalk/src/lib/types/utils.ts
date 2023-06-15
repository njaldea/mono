export interface Prettify {
    output: this extends { input: infer Input }
        ? Input extends Record<string, unknown>
            ? { [K in keyof Input]: Input[K] }
            : Input
        : never;
}

type Length<T> = unknown extends T
    ? 0
    : T extends readonly unknown[]
    ? number extends T["length"]
        ? { __error: "not a tuple" }
        : T["length"]
    : { __error: "length error" };

type Fallback<T> = unknown extends T ? readonly [] : T extends readonly unknown[] ? T : never;

export interface Iterate {
    output: this extends {
        input: infer Input; // collection
        op: infer Operation; // receives two arguments. like accumulate
        pred: infer Predicate; // what to apply for each item in collection
        forward?: infer ForwardOp; // passed to the input of predicate
        processed?: infer Processed; // accumulator for indexing
    }
        ? Input extends readonly [infer First, ...infer Rest]
            ? Predicate & ForwardOp & { input: First; index: Length<Processed> } extends {
                  output: infer Result;
              }
                ? Operation & {
                      first: Result;
                      second: (Iterate & {
                          input: Rest;
                          op: Operation;
                          pred: Predicate;
                          forward: ForwardOp;
                          processed: Length<Processed> extends 0
                              ? [0]
                              : [...Fallback<Processed>, First];
                      })["output"];
                  } extends { output: infer OperationOut }
                    ? OperationOut
                    : never
                : never
            : Operation extends { default: infer Default }
            ? Default
            : never
        : never;
}

export interface OPArrayed {
    default: [];
    output: this extends {
        first: infer First;
        second: infer Second extends readonly unknown[];
    }
        ? readonly [First, ...Second]
        : this["default"];
}

export interface OPAnd {
    default: object;
    output: this extends {
        first: infer First;
        second: infer Second;
    }
        ? (Prettify & { input: First & Second })["output"]
        : this["default"];
}

export interface OPOr {
    default: never;
    output: this extends {
        first: infer First;
        second: infer Second;
    }
        ? First | Second
        : this["default"];
}

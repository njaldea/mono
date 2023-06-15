import type { Prettify, Iterate, OPArrayed, OPAnd, OPOr } from "./utils";

interface TupleValuefy {
    output: this extends {
        input: infer Input;
        primes: infer Primes;
    }
        ? Input extends { readonly type: infer Type }
            ? Type extends keyof Primes
                ? Primes[Type]
                : never
            : never
        : never;
}

interface ObjectValuefy {
    output: this extends {
        primes: infer Primes;
        input: infer Input;
    }
        ? Input extends { readonly type: infer Type; readonly key: infer Key extends string }
            ? Type extends keyof Primes
                ? { [K in Key]: Primes[Type] }
                : never
            : never
        : never;
}

interface PrimeValuefy {
    output: this extends {
        primes: infer Primes;
        input: infer Input;
    }
        ? Input extends { type: infer Type; value: infer Value }
            ? (Iterate & {
                  input: Value;
                  pred: Type extends "tuple" ? TupleValuefy : ObjectValuefy;
                  op: Type extends "tuple" ? OPArrayed : OPAnd;
                  forward: { primes: Primes };
              })["output"]
            : Input extends { type: infer Type }
            ? Type extends keyof Primes
                ? Primes[Type]
                : never
            : { __error: "Invalid input" }
        : never;
}

type Detail<Primes> =
    | {
          readonly type: "tuple";
          readonly value: readonly {
              readonly type: Exclude<keyof Primes, "tuple" | "object">;
              readonly key?: { __error: "unexpected key for tuple type" };
          }[];
      }
    | {
          readonly type: "object";
          readonly value: readonly {
              readonly type: Exclude<keyof Primes, "tuple" | "object">;
              readonly key: string;
          }[];
      }
    | {
          readonly type: Exclude<keyof Primes, "tuple" | "object">;
          readonly value?: { __error: "unexpected value for type" };
      };

export interface TypeDetails {
    output: this extends {
        primes: infer Primes;
    }
        ? readonly [Detail<Primes>, ...Detail<Primes>[]]
        : { __error: "Please provide at least one alias" };
}

export interface AddPrime {
    output: this extends {
        primes: infer Primes;
        detail: infer Detail;
        type: infer Type extends string;
    }
        ? (Prettify & {
              input: Primes & {
                  [K in Type]: (Iterate & {
                      input: Detail;
                      op: OPOr;
                      pred: PrimeValuefy;
                      forward: { primes: Primes };
                  })["output"];
              };
          })["output"]
        : never;
}

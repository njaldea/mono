import type { Builder } from "../Builder";

export type Inspect<B> = B extends Builder<infer Context, infer Primes, infer Types>
    ? {
          context: Context;
          primes: Primes;
          types: Types;
      }
    : never;

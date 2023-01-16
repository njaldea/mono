import type { Decrement } from "type-plus/ts/math";
import type { Head, Tail, Reverse } from "type-plus/ts/array";

// prettier-ignore
type CommonKeys<T extends unknown[], U> =
    number extends T["length"] ? never
    : T["length"] extends 0 ? never
    : Head<T> extends U ? Decrement<T["length"]> | CommonKeys<Tail<T>, U>
    : CommonKeys<Tail<T>, U>;

// prettier-ignore
type Indices<T extends number> =
    T extends 0 ? never
    : T extends 1 ? 0
    : Decrement<T> | Indices<Decrement<T>>;

// prettier-ignore
type ValidIndex<T extends unknown[], U> =
    // TODO: do not allow array where length is unknown for now
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    number extends T["length"] ? never
    : CommonKeys<Reverse<T>, U>;

// prettier-ignore
export type WithinLength<T extends unknown[], U extends number> =
    // TODO: do not allow array where length is unknown for now
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    number extends T["length"] ? never
    : U extends Indices<T["length"]> ? U
    : never;

// prettier-ignore
export type KnownLength<T extends unknown[]> =
    number extends T["length"] ? never : T;

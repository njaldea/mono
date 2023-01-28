// prettier-ignore
type MinusOneHelper<T extends number, A extends unknown[], P extends number> =
    A["length"] extends T ? P
    : A["length"] extends 0 ? MinusOneHelper<T, [unknown], 0>
    : MinusOneHelper<T, [unknown, ...A], A["length"]>;

// prettier-ignore
type Decrement<T extends number> =
    T extends 0 ? never
    : MinusOneHelper<T, [], 0>;

// prettier-ignore
type Head<T extends unknown[]> =
    T["length"] extends 0 ? never
    : T[0];

// prettier-ignore
type Tail<T extends unknown[]> =
    T["length"] extends 0 ? never
    : T["length"] extends 1 ? []
    : T["length"] extends 2 ? [T[1]]
    : T extends [unknown, ...infer U] ? U
    : never;

// prettier-ignore
type Reverse<T extends unknown[]> =
    number extends T["length"] ? never
    : T["length"] extends 0 ? []
    : T["length"] extends 1 ? T
    : T extends [unknown, ...infer U] ? [...Reverse<U>, T[0]]
    : never;

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
export type ValidIndex<T extends unknown[], U> =
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

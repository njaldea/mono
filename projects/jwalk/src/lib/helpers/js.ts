/**
 * This library is intended to be used as an alternative for cases where typescript `as const` is not available.
 * JWalk relies heavily on typescript's generics type system to help autocomplete.
 *
 * In normal cases when `as const` is used, all entries of the objects are marked as readonly,
 * thus some of the type compuatations requires `readonly`.
 */

// eslint-disable-next-line camelcase
export const const_key = <T extends string>(t: T): T => t;

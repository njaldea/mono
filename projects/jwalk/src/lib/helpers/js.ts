/**
 * This library is intended to be used as an alternative for cases where typescript `as const` is not available.
 * JWalk relies heavily on typescript's generics type system to help autocomplete.
 *
 * In normal cases when `as const` is used, all entries of the objects are marked as readonly,
 * thus some of the type compuatations requires `readonly`.
 */

/**
 * Helper method to convert arrays to tuple
 * JWalk requires tuples for `type` and `node` registration
 *
 * @param args
 * @returns tuple
 */
export const array = <T extends readonly unknown[]>(...args: T): readonly [...T] => [...args];

/**
 * @param type string
 * @param value readonly { type: string; key?: string; }[]. -- use `value` helper.
 * @returns `{ type: string; value: readonly { type: string; key?: string; }[]; }`
 */
export const group = <T extends string, V extends readonly unknown[]>(
    type: T,
    value: V
): { readonly type: T; readonly value: V } => ({ type, value });

/**
 * Use for tuple
 * @param type string
 * @returns `{ type: string; }`
 */
export function value<T extends string>(type: T): { readonly type: T };
/**
 * Use for object
 * @param type string
 * @param key string
 * @returns `{ type: string; key: string; }`
 */
export function value<T extends string, K extends string>(
    type: T,
    key: K
): { readonly type: T; readonly key: K };
// eslint-disable-next-line func-style
export function value(type: string, key?: string): unknown {
    if (null != key) {
        return { type, key };
    }
    return { type };
}

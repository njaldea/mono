/* eslint-disable no-use-before-define */

import { check, type TypeDetail, type TypeDetailNode } from "./check";

import type {
    ValidateContent,
    ValidateRefs,
    ValidateType,
    ValidateAlias
} from "./types/validation";
import type {
    ResolveTypes,
    ResolveType,
    ResolveAction,
    ResolveGroupAction
} from "./types/resolution";
import type { GroupType, Prettify, ActionReturn, Action, Unalias } from "./types/utils";

type Auto<Context, Key, Value> = (
    create: (key: Key) => Context,
    destroy: (key: Key) => void,
    value: Value
) => {
    update: (value: Value) => void;
    destroy: () => void;
};

const noop = () => {};

interface AddInfer {
    output: this extends {
        primes: infer Primes;
        types: infer Types;
        base: infer Base;
    }
        ? {
              /**
               * use only for inferring types
               */
              primes: Primes;
              /**
               * use only for inferring types
               */
              types: (Prettify & { input: Types })["output"];
          } & Base
        : never;
}

export interface Buildify {
    output: this extends {
        context: infer Context;
        primes: infer Primes extends string;
        types: infer Types;
    }
        ? (AddInfer & {
              primes: Primes;
              types: (Prettify & { input: Types })["output"];
              base: Builder<Context, Primes, (Prettify & { input: Types })["output"]>;
          })["output"]
        : never;
}

export type Memoizer = <Value>(value: Value) => (v: Value) => boolean;

export class Builder<Context, Primes extends string, Types> {
    #memoizer: Memoizer;
    #primes: Record<string, unknown>;
    #nodes: Record<string, TypeDetail<Context>>;

    constructor(
        memoizer: Memoizer,
        primes: Record<string, unknown>,
        nodes: Record<string, TypeDetail<Context>>
    ) {
        this.#memoizer = memoizer;
        this.#primes = primes;
        this.#nodes = nodes;
    }

    type<Type extends string, const Detail>(
        type: ValidateAlias<Type, "ROOT" | GroupType, Primes>,
        detail: ValidateType<Detail, Primes>
    ): (Buildify & {
        context: Context;
        primes: Primes | Type;
        types: Types & { [T in Type]: ResolveTypes<Detail, Types> };
    })["output"] {
        if ((detail as readonly unknown[]).length > 0) {
            check.type(
                type as string,
                detail as readonly { type: string; value?: readonly string[] }[],
                this.#primes
            );
            return new Builder(
                this.#memoizer,
                { ...this.#primes, [type as string]: detail },
                this.#nodes
            ) as (Buildify & {
                context: Context;
                primes: Primes | Type;
                types: Types & { [T in Type]: ResolveTypes<Detail, Types> };
            })["output"];
        }
        throw new Error(`[${type as string}] requires at least one alias type`);
    }

    node<Key extends string, const Type, const Content, const Refs>(
        key: ValidateAlias<Key, Primes, keyof Types>,
        type: Type extends Primes | GroupType
            ? Type
            : (Unalias & { input: Primes | GroupType })["output"],
        detail: Type extends GroupType
            ? {
                  /**
                   *  type of the items inside the group type
                   */
                  content: ValidateContent<Content, Type, Exclude<keyof Types, symbol | number>>;
                  /**
                   *  method to be called when node is traversed.
                   *
                   *  if not provided, it is assumed that auto action is to be used.
                   */
                  action?: (ResolveGroupAction & {
                      context: Context;
                      content: Content;
                      type: Type;
                      types: Types;
                      primes: Primes;
                  })["output"];
              }
            : {
                  /**
                   *  list of node types that is needed to be available inside the action.
                   */
                  refs?: ValidateRefs<Refs, Exclude<keyof Types, symbol | number | Primes>>;
                  /**
                   *  method to be called when node is traversed.
                   */
                  action: (ResolveAction & {
                      context: Context;
                      type: Type;
                      refs: Refs;
                      types: Types;
                      primes: Primes;
                  })["output"];
              }
    ): (Buildify & {
        context: Context;
        primes: Primes;
        types: Types & { [T in Key]: ResolveType<Type, Content, Types> };
    })["output"] {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (null != key && null != type && null != detail) {
            const meta = { ...detail, type } as TypeDetail<Context>;
            check.node(key as string, meta, this.#primes, this.#nodes);
            // TODO: store a more important data for detail
            // maybe a json validator or something similar
            return new Builder(this.#memoizer, this.#primes, {
                ...this.#nodes,
                [key as string]: meta
            }) as (Buildify & {
                context: Context;
                primes: Primes;
                types: Types & { [T in Key]: ResolveType<Type, Content, Types> };
            })["output"];
        } else {
            throw new Error("Invalid arguments provided.");
        }
    }

    build(
        context: Context,
        value: "ROOT" extends keyof Types ? Types["ROOT"] : { __error: "ROOT is not registered" }
    ): (AddInfer & {
        primes: Primes;
        types: (Prettify & { input: Types })["output"];
        base: (ActionReturn & { value: Types extends { ROOT: infer R } ? R : never })["output"];
    })["output"] {
        if ("ROOT" in this.#nodes) {
            return this.#genAction("ROOT")(context, value) as (AddInfer & {
                primes: Primes;
                types: (Prettify & { input: Types })["output"];
                base: (ActionReturn & {
                    value: Types extends { ROOT: infer R } ? R : never;
                })["output"];
            })["output"];
        }
        throw new Error("ROOT is not registered");
    }

    #instances<Key extends string | number, Value extends Readonly<Record<Key, unknown>>>(
        create: (key: Key) => Context,
        destroy: (key: Key) => void
    ) {
        const instances = new Map<
            Key,
            { value: unknown; action: (ActionReturn & { value: Value })["output"] }
        >();
        return {
            set: (
                key: Key,
                value: Value,
                action: (Action & { context: Context; value: unknown })["output"]
            ) => {
                if (instances.has(key)) {
                    instances.get(key)?.action.update(value);
                } else {
                    const instance = action(create(key), value[key]);
                    instances.set(key, {
                        value,
                        action: {
                            update: (v) => {
                                instance.update(v[key]);
                            },
                            destroy: () => {
                                instance.destroy();
                                instances.delete(key);
                                destroy(key);
                            }
                        }
                    });
                }
            },
            delete: (key: Key) => {
                instances.get(key)?.action.destroy();
                instances.delete(key);
            }
        };
    }

    /**
     * returns the following:
     *  -  items
     *    - key (string | number)
     *    - type string
     *    - only includes those that are registered via node (has action)
     *  -  refs
     *    - all actions stored in a record
     */
    #reduce<T extends string | number>(
        value: readonly string[],
        itemize: (t: string, i: number) => { key: T; type: string }
    ) {
        type Reducer = {
            refs: Record<string, (Action & { context: Context; value: unknown })["output"]>;
            items: { type: string; key: T }[];
        };
        return value.reduce<Reducer>(
            (accumulator, v, i) => {
                const item = itemize(v, i);
                if (item.type in this.#nodes) {
                    if (!(item.type in accumulator.refs)) {
                        const action = this.#genAction(item.type);
                        accumulator.refs[item.type] = (context, value) => {
                            const { update, destroy } = action(context, value);
                            const memo = this.#memoizer(value);
                            return {
                                update: (v) => memo(v) && update(v),
                                destroy
                            };
                        };
                    }
                    accumulator.items.push(item);
                }
                return accumulator;
            },
            { items: [], refs: {} }
        );
    }

    #genTuple(
        context: Context,
        value: readonly unknown[],
        d: TypeDetailNode<Context, "tuple">
    ): (ActionReturn & { context: Context; value: unknown[] })["output"] {
        const { items, refs } = this.#reduce<number>(d.content, (t, i) => {
            return { key: i, type: t };
        });
        const auto: Auto<Context, number, readonly unknown[]> = (create, destroy, value) => {
            const instances = this.#instances(create, destroy);
            items.forEach((i) => instances.set(i.key, value, refs[i.type]));
            return {
                update: (value) => items.forEach((i) => instances.set(i.key, value, refs[i.type])),
                destroy: () => items.reverse().forEach((i) => instances.delete(i.key))
            };
        };
        if (null != d.action) {
            return d.action({ context, value, refs, auto, meta: { content: d.content } });
        }
        return auto(() => context, noop, value);
    }

    #genObject(
        context: Context,
        value: Readonly<Record<string, unknown>>,
        d: TypeDetailNode<Context, "object">
    ): (ActionReturn & { context: Context; value: Readonly<Record<string, unknown>> })["output"] {
        const { items, refs } = this.#reduce<string>(d.content, (v) => {
            const [key, type] = v.split(":");
            return { key, type };
        });
        const auto: Auto<Context, string, Readonly<Record<string, unknown>>> = (
            create,
            destroy,
            value
        ) => {
            const instances = this.#instances(create, destroy);
            items.forEach((i) => instances.set(i.key, value, refs[i.type]));
            return {
                update: (value) => items.forEach((i) => instances.set(i.key, value, refs[i.type])),
                destroy: () => items.reverse().forEach((i) => instances.delete(i.key))
            };
        };
        if (null != d.action) {
            return d.action({ context, value, refs, auto, meta: { content: d.content } });
        }
        return auto(() => context, noop, value);
    }

    #genList(
        context: Context,
        value: readonly unknown[],
        d: TypeDetailNode<Context, "list">
    ): (ActionReturn & { context: Context; value: unknown[] })["output"] {
        const { refs } = this.#reduce<string>([d.content], (v) => ({ key: "", type: v }));
        const auto: Auto<Context, number, readonly unknown[]> = (create, destroy, value) => {
            if (d.content in this.#primes) {
                return { update: noop, destroy: noop };
            }
            const instances = this.#instances(create, destroy);
            value.forEach((v, i) => instances.set(i, value, refs[d.content]));
            let currentLength = value.length;
            return {
                update: (v) => {
                    for (let i = 0; i < v.length; ++i) {
                        instances.set(i, v, refs[d.content]);
                    }
                    if (v.length < currentLength) {
                        for (let i = currentLength - 1; i >= v.length; --i) {
                            instances.delete(i);
                        }
                    }
                    currentLength = v.length;
                },
                destroy: () => {
                    for (let i = currentLength - 1; i >= 0; --i) {
                        instances.delete(i);
                    }
                }
            };
        };
        if (null != d.action) {
            return d.action({ context, value, refs, auto, meta: { content: d.content } });
        }
        return auto(() => context, noop, value);
    }

    #genMap(
        context: Context,
        value: Readonly<Record<string, unknown>>,
        d: TypeDetailNode<Context, "map">
    ): (ActionReturn & { context: Context; value: Readonly<Record<string, unknown>> })["output"] {
        const { refs } = this.#reduce<string>([d.content], (v) => ({ key: "", type: v }));
        const auto: Auto<Context, string, Readonly<Record<string, unknown>>> = (
            create,
            destroy,
            value
        ) => {
            if (d.content in this.#primes) {
                return { update: noop, destroy: noop };
            }
            const instances = this.#instances(create, destroy);
            let keys = Object.keys(value);
            keys.forEach((key) => instances.set(key, value, refs[d.content]));
            return {
                update: (v) => {
                    const nkeys = Object.keys(v);
                    for (const nkey of nkeys) {
                        instances.set(nkey, v, refs[d.content]);
                    }
                    for (const key of keys.reverse()) {
                        if (!nkeys.includes(key)) {
                            instances.delete(key);
                        }
                    }
                    keys = nkeys;
                },
                destroy: () => {
                    keys.reverse().forEach((k) => instances.delete(k));
                }
            };
        };
        if (null != d.action) {
            return d.action({ context, value, refs, auto, meta: { content: d.content } });
        }
        return auto(() => context, noop, value);
    }

    #genPrime(context: Context, value: unknown, d: TypeDetailNode<Context, string>) {
        const { refs } = this.#reduce<number>(d.refs ?? [], (t, i) => {
            return { key: i, type: t };
        });
        return d.action({ context, value, refs });
    }

    #genAction(
        itype: "list" | "tuple"
    ): (Action & { context: Context; value: unknown[] })["output"];
    #genAction(
        itype: "map" | "object"
    ): (Action & { context: Context; value: Record<string, unknown> })["output"];
    #genAction(
        itype: Exclude<string, GroupType>
    ): (Action & { context: Context; value: unknown })["output"];
    #genAction(itype: string) {
        const d = this.#nodes[itype];
        if ("tuple" === d.type && "content" in d) {
            return (context: Context, value: unknown[]) => {
                return this.#genTuple(context, value, d);
            };
        }
        if ("object" === d.type && "content" in d) {
            return (context: Context, value: Record<string, unknown>) => {
                return this.#genObject(context, value, d);
            };
        }
        if ("list" === d.type && "content" in d) {
            return (context: Context, value: unknown[]) => {
                return this.#genList(context, value, d);
            };
        }
        if ("map" === d.type && "content" in d) {
            return (context: Context, value: Record<string, unknown>) => {
                return this.#genMap(context, value, d);
            };
        }
        if (!("content" in d)) {
            return (context: Context, value: unknown) => {
                return this.#genPrime(context, value, d);
            };
        }
        throw new Error("Should be unreachable code.");
    }
}

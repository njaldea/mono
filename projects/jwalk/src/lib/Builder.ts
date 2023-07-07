import { check, type TypeDetail } from "./check";

import type { GetValue, ActionReturn, Action } from "./types/actionargs";

import type { ValidateNode, ValidateType, ValidateAlias } from "./types/validation";
import type {
    ResolveTypes,
    ResolveType,
    ResolveAction,
    ResolveGroupAction
} from "./types/resolution";
import type { Prettify } from "./types/utils";

type GroupType = "tuple" | "object" | "map" | "list";
type Auto<Context, Key, Value> = (
    create: (key: Key) => Context,
    destroy: (context: Context) => void,
    value: Value
) => {
    update: (value: Value) => void;
    destroy: () => void;
};
type Pass<Context, Value> = (Action & { context: Context; value: Value })["output"];

export class Builder<Context, Primes extends string, Types> {
    #primes: Record<string, unknown>;
    #nodes: Record<string, TypeDetail>;

    constructor(primes: Record<string, unknown>, nodes: Record<string, TypeDetail>) {
        this.#primes = primes;
        this.#nodes = nodes;
    }

    type<Type extends string, const Detail>(
        type: ValidateAlias<Type, "ROOT" | GroupType, Primes>,
        detail: ValidateType<Detail, Primes>
    ): Builder<
        Context,
        Primes | Type,
        (Prettify & { input: Types & { [T in Type]: ResolveTypes<Detail, Types> } })["output"]
    > {
        if ((detail as readonly unknown[]).length > 0) {
            check.type(
                type as string,
                detail as readonly { type: string; value?: readonly string[] }[],
                this.#primes
            );
            return new Builder({ ...this.#primes, [type as string]: detail } as const, this.#nodes);
        }
        throw new Error(`[${type as string}] requires at least one alias type`);
    }

    node<Key extends string, Type extends Primes | GroupType, const Value>(
        key: ValidateAlias<Key, Primes, keyof Types>,
        type: Type,
        detail: Type extends GroupType
            ? {
                  value: ValidateNode<Value, Type, Exclude<keyof Types, symbol | number>>;
                  action: (ResolveGroupAction & {
                      type: Type;
                      context: Context;
                      value: Value;
                      types: Types;
                      primes: Primes;
                  })["output"];
              }
            : { action: (ResolveAction & { type: Type; context: Context; types: Types })["output"] }
    ): Builder<
        Context,
        Primes,
        (Prettify & { input: Types & { [T in Key]: ResolveType<Type, Value, Types> } })["output"]
    > {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (null != key && null != type && null != detail) {
            const meta = { ...detail, type } as TypeDetail;
            check.node(key as string, meta, this.#primes, this.#nodes);
            const n = { ...this.#nodes, [key as string]: meta };
            return new Builder(this.#primes, n);
        } else {
            throw new Error("Invalid arguments provided.");
        }
    }

    build(
        context: Context,
        value: "ROOT" extends keyof Types ? Types["ROOT"] : { __error: "ROOT is not registered" }
    ): (ActionReturn & { value: GetValue<"ROOT", Primes, Types> })["output"] {
        if ("ROOT" in this.#nodes) {
            return this.#genaction("ROOT")(context, value);
        }
        throw new Error("ROOT is not registered");
    }

    #genaction(itype: string): (Action & { context: Context; value: unknown })["output"] {
        return (context, value) => {
            if (itype in this.#primes) {
                return { update: () => {}, destroy: () => {} };
            }
            const d = this.#nodes[itype];
            if (null != d.action) {
                if ("tuple" === d.type) {
                    type IValue = readonly string[];
                    const refs: Record<
                        string,
                        (Action & { context: Context; value: unknown })["output"]
                    > = {};
                    const items: { type: string; key: number }[] = [];
                    (d.value as IValue).forEach((v, i) => {
                        if (v in this.#nodes) {
                            if (!(v in refs)) {
                                refs[v] = this.#genaction(v);
                            }
                            items.push({ type: v, key: i });
                        }
                    });
                    const auto: Auto<Context, number, unknown[]> = (create, destroy, value) => {
                        const instances = items.map(({ key, type }) => {
                            const context = create(key);
                            return {
                                key,
                                context,
                                instance: refs[type](context, value[key])
                            };
                        });
                        return {
                            update: (value) => {
                                instances.forEach(({ instance, key }) =>
                                    instance.update(value[key])
                                );
                            },
                            destroy: () => {
                                instances.reverse().forEach(({ instance, context }) => {
                                    instance.destroy();
                                    destroy(context);
                                });
                            }
                        };
                    };
                    const pass: Pass<Context, unknown[]> = (context, value) =>
                        auto(
                            () => context,
                            () => {},
                            value
                        );
                    return d.action(context, { value, refs, auto, pass });
                }
                if ("object" === d.type) {
                    type IValue = readonly string[];
                    const refs: Record<
                        string,
                        (Action & { context: Context; value: unknown })["output"]
                    > = {};
                    const items: { type: string; key: string }[] = [];
                    (d.value as IValue).forEach((v) => {
                        const [vkey, vtype] = v.split(":");
                        if (vtype in this.#nodes) {
                            if (!(vtype in refs)) {
                                refs[vtype] = this.#genaction(vtype);
                            }
                            items.push({ key: vkey, type: vtype });
                        }
                    });
                    const auto: Auto<Context, string, Record<string, unknown>> = (
                        create,
                        destroy,
                        value
                    ) => {
                        const instances = items.map(({ key, type }) => {
                            const context = create(key);
                            return {
                                key,
                                context,
                                instance: refs[type](context, value[key])
                            };
                        });
                        return {
                            update: (value) => {
                                instances.forEach(({ instance, key }) =>
                                    instance.update(value[key])
                                );
                            },
                            destroy: () => {
                                instances.reverse().forEach(({ instance, context }) => {
                                    instance.destroy();
                                    destroy(context);
                                });
                            }
                        };
                    };
                    const pass: Pass<Context, Record<string, unknown>> = (context, value) =>
                        auto(
                            () => context,
                            () => {},
                            value
                        );
                    return d.action(context, { value, refs, auto, pass });
                }
                if ("map" === d.type) {
                    const t = d.value as string;
                    const action = this.#genaction(t);
                    const refs = t in this.#nodes ? { [t]: action } : {};
                    const auto: Auto<Context, string, Record<string, unknown>> = (
                        create,
                        destroy,
                        value
                    ) => {
                        let keys = Object.keys(value);
                        type Instance = {
                            context: Context;
                            action: (ActionReturn & { value: unknown })["output"];
                        };
                        const instances = new Map<string, Instance>();
                        for (const key of keys) {
                            const context = create(key);
                            instances.set(key, {
                                context,
                                action: action(context, value[key])
                            });
                        }
                        return {
                            update: (v) => {
                                const nkeys = Object.keys(v);
                                for (const nkey of nkeys) {
                                    if (instances.has(nkey)) {
                                        instances.get(nkey)?.action.update(v[nkey]);
                                    } else {
                                        const context = create(nkey);
                                        instances.set(nkey, {
                                            context,
                                            action: action(context, v[nkey])
                                        });
                                    }
                                }
                                for (const key of keys.reverse()) {
                                    if (!nkeys.includes(key)) {
                                        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
                                        const instance = instances.get(key) as Instance;
                                        instance.action.destroy();
                                        destroy(instance.context);
                                        instances.delete(key);
                                    }
                                }
                                keys = nkeys;
                            },
                            destroy: () => {
                                for (const key of keys.reverse()) {
                                    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
                                    const instance = instances.get(key) as Instance;
                                    instance.action.destroy();
                                    destroy(instance.context);
                                }
                            }
                        };
                    };
                    const pass: Pass<Context, Record<string, unknown>> = (context, value) =>
                        auto(
                            () => context,
                            () => {},
                            value
                        );
                    return d.action(context, { value, refs, auto, pass });
                }
                if ("list" === d.type) {
                    const t = d.value as string;
                    const action = this.#genaction(t);
                    const refs = t in this.#nodes ? { [t]: action } : {};
                    const auto: Auto<Context, number, unknown[]> = (create, destroy, value) => {
                        const instances = value.map((v, i) => {
                            const context = create(i);
                            return { context, action: action(context, v) };
                        });
                        return {
                            update: (v) => {
                                for (let i = 0; i < v.length; ++i) {
                                    if (i < instances.length) {
                                        instances[i].action.update(v[i]);
                                    } else {
                                        const context = create(i);
                                        instances.push({
                                            context,
                                            action: action(context, v[i])
                                        });
                                    }
                                }
                                if (v.length < instances.length) {
                                    for (let i = instances.length - 1; i >= v.length; --i) {
                                        instances[i].action.destroy();
                                        destroy(instances[i].context);
                                    }
                                    instances.splice(v.length, instances.length - v.length);
                                }
                            },
                            destroy: () => {
                                instances.reverse().forEach((v) => {
                                    v.action.destroy();
                                    destroy(v.context);
                                });
                            }
                        };
                    };
                    const pass: Pass<Context, unknown[]> = (context, value) =>
                        auto(
                            () => context,
                            () => {},
                            value
                        );
                    return d.action(context, { value, refs, auto, pass });
                }
            }
            throw new Error("Should be unreachable code.");
        };
    }
}

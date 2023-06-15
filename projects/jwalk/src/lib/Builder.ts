import { check } from "./impl/check";
import { resolver } from "./impl/resolver";
import type { TypeDetail } from "./types/detail";

import type { AddPrime, TypeDetails } from "./types/primes";
import type { AddTypes, ActionType, ValueType, GetProp, Action } from "./types/types";

export class Builder<Context, Primes, Types> {
    #primes: Record<string, unknown>;
    #mapping: Record<string, TypeDetail>;

    constructor(primes: Record<string, unknown>, mapping: Record<string, TypeDetail>) {
        this.#primes = primes;
        this.#mapping = mapping;
    }

    type<Type extends string, Detail extends (TypeDetails & { primes: Primes })["output"]>(
        type: Type extends keyof Primes
            ? { __error: `[${Type}] is already registered` }
            : Type extends "ROOT"
            ? { __error: `[${Type}] is reserved` }
            : Type,
        detail: Detail
    ): Builder<
        Context,
        (AddPrime & { primes: Primes; type: Type; detail: Detail })["output"],
        Types
    > {
        if (detail.length > 0) {
            return new Builder(
                { ...this.#primes, [type as string]: detail } as const,
                this.#mapping
            );
        }
        throw new Error(`[${type as string}] requires at least one alias type`);
    }

    node<
        Key extends string,
        Type extends (keyof Primes | keyof Types) & string,
        Value extends (ValueType & {
            primes: Primes;
            types: Types;
            type: Type;
        })["output"],
        Action extends (ActionType & {
            context: Context;
            primes: Primes;
            types: Types;
            type: Type;
            value: Value;
        })["output"]
    >(
        key: Key extends keyof Primes
            ? { __error: `[${Key}] is reserved` }
            : Key extends keyof Types
            ? { __error: `{${Key}] is already registered` }
            : Key,
        type: Type,
        detail: Type extends Exclude<keyof Primes, "tuple" | "object">
            ? { action: Action }
            : Type extends "tuple" | "object"
            ? {
                  value?: Value;
                  action: Action;
              }
            : Type extends keyof Types
            ? { value: Value }
            : never
    ): Builder<
        Context,
        Primes,
        (AddTypes & {
            key: Key;
            type: Type;
            types: Types;
            primes: Primes;
            value: Value;
        })["output"]
    > {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (null != key && null != type && null != detail) {
            const meta = { ...detail, type } as TypeDetail;
            check.check(key as string, meta, this.#primes, this.#mapping);
            const n = { ...this.#mapping, [key as string]: meta };
            return new Builder(this.#primes, n);
        } else {
            throw new Error("Invalid arguments provided.");
        }
    }

    build(
        context: Context,
        value: "ROOT" extends keyof Types
            ? GetProp<Primes, Types, "ROOT", "value">
            : { __error: "ROOT is not registered" }
    ): ReturnType<Action<Context, GetProp<Primes, Types, "ROOT", "value">>> {
        const genaction = (
            itype: string,
            ivalue: unknown
        ): ((n: Context, v: unknown) => ReturnType<Action<Context, unknown>>) => {
            return (context, value) => {
                if (itype in this.#primes) {
                    return { update: () => {}, destroy: () => {} };
                }
                const { type, action } = resolver.resolve(itype, this.#primes, this.#mapping);
                if (null != action) {
                    if ("tuple" === type || "object" === type) {
                        const actions = (
                            ivalue as readonly {
                                readonly key: string;
                                readonly type: string;
                                readonly value: unknown;
                            }[]
                        ).map((v, i) => ({
                            type: v.type,
                            key: "tuple" === type ? i : v.key,
                            action: genaction(
                                v.type,
                                v.value ??
                                    resolver.value(v.type, this.#primes, this.#mapping)?.value
                            )
                        }));
                        return action(context, {
                            value,
                            actions,
                            action: (context: Context, value: Record<string | number, unknown>) => {
                                const instances = actions.map(({ key, action }) => {
                                    return {
                                        key,
                                        instance: action(context, value[key])
                                    };
                                });
                                return {
                                    update: (value: Record<string | number, unknown>) => {
                                        instances.map((i) => i.instance.update(value[i.key]));
                                    },
                                    destroy: () => {
                                        instances.reverse().forEach((i) => i.instance.destroy());
                                    }
                                };
                            }
                        });
                    }
                    if (type in this.#primes) {
                        return action(context, { value });
                    }
                }
                throw new Error("Should be unreachable code.");
            };
        };
        if ("ROOT" in this.#mapping) {
            return genaction("ROOT", resolver.value("ROOT", this.#primes, this.#mapping)?.value)(
                context,
                value
            );
        }
        throw new Error("ROOT is not registered");
    }
}

/**
 * Used by Builder / check / resolver
 * Only used for internal code
 */
export type TypeDetail = {
    type: string;
    action?: (
        n: unknown,
        detail:
            | {
                  readonly value: unknown;
              }
            | {
                  readonly value: unknown;
                  readonly refs: unknown;
                  readonly auto: unknown;
                  readonly pass: unknown;
              }
    ) => { update: (vv: unknown) => void; destroy: () => void };
    value?: readonly string[] | string;
};

const grouptype = ["tuple", "object", "map", "list"];

export const check = {
    type: (
        type: string,
        detail: readonly { type: string; value?: readonly string[] | string }[],
        primes: Record<string, unknown>
    ) => {
        if (type in primes || grouptype.includes(type)) {
            throw new Error(`[${type}] already registered`);
        }
        if ("ROOT" === type) {
            throw new Error(`[${type}] is reserved`);
        }
        for (const item of detail) {
            if ("object" === item.type) {
                if (!Array.isArray(item.value)) {
                    throw new Error(`[${type}] missing/invalid value`);
                }
                for (const v of item.value as string[]) {
                    const value = v.split(":");
                    if (value.length !== 2) {
                        throw new Error(
                            `[${item.type}] expecting "key:type" format. trying to use [${v}]`
                        );
                    }
                    if (grouptype.includes(value[1])) {
                        throw new Error(
                            `[${item.type}] nested value is not supported. trying to use [${v}]`
                        );
                    }
                    if (!(value[1] in primes)) {
                        throw new Error(`[${item.type}] unknown alias type [${value[1]}]`);
                    }
                }
            } else if ("tuple" === item.type) {
                if (!Array.isArray(item.value)) {
                    throw new Error(`[${type}] missing/invalid value`);
                }
                for (const v of item.value as string[]) {
                    if (grouptype.includes(v)) {
                        throw new Error(
                            `[${item.type}] nested value is not supported. trying to use [${v}]`
                        );
                    }
                    if (!(v in primes)) {
                        throw new Error(`[${item.type}] unknown alias type [${v}]`);
                    }
                }
            } else if ("map" === item.type || "list" === item.type) {
                if ("string" !== typeof item.value) {
                    throw new Error(`[${item.type}] missing/invalid value`);
                }
                if (!(item.value in primes)) {
                    throw new Error(`[${item.type}] unknown alias type [${item.value}]`);
                }
            } else if (null != item.value) {
                throw new Error(`[${item.type}] unexpected value provided`);
            }
        }
    },
    node: (
        type: string,
        t: TypeDetail,
        primes: Record<string, unknown>,
        types: Record<string, TypeDetail>
    ) => {
        if (type in primes || grouptype.includes(type)) {
            throw new Error(`[${type}] is reserved`);
        }

        if (type in types) {
            throw new Error(`[${type}] already registered`);
        }

        if (!(t.type in primes) && !grouptype.includes(t.type)) {
            if (t.type in types) {
                throw new Error(`[${type}] can't use node type [${t.type}]`);
            } else {
                throw new Error(`[${type}] unknown alias type [${t.type}]`);
            }
        }

        if (t.type in primes && null == t.action) {
            throw new Error(`[${type}] requires an action [${t.type}]`);
        }

        if (!(t.type in primes) && !grouptype.includes(t.type)) {
            throw new Error(`[${type}] alias not supported [${t.type}]`);
        }

        if (!grouptype.includes(t.type)) {
            if (t.value != null) {
                throw new Error(`[${type}] "${t.type}" can't have "value"`);
            }
        }

        if ("tuple" === t.type) {
            if (!Array.isArray(t.value)) {
                throw new Error(`[${type}] missing/invalid value`);
            }
            for (const value of t.value as readonly string[]) {
                if (grouptype.includes(value)) {
                    throw new Error(`[${type}] value can't use [${value}]`);
                }
                if (!(value in primes) && !(value in types)) {
                    throw new Error(`[${type}] unknown alias type [${value}]`);
                }
            }
        } else if ("object" === t.type) {
            if (!Array.isArray(t.value)) {
                throw new Error(`[${type}] missing/invalid value`);
            }
            for (const v of t.value as readonly string[]) {
                const value = v.split(":");
                if (value.length !== 2) {
                    throw new Error(
                        `[${t.type}] expecting "key:type" format. trying to use [${v}]`
                    );
                }
                if (grouptype.includes(value[1])) {
                    throw new Error(
                        `[${t.type}] nested value is not supported. trying to use [${v}]`
                    );
                }
                if (!(value[1] in primes) && !(value[1] in types)) {
                    throw new Error(`[${type}] unknown alias type [${value[1]}]`);
                }
            }
        } else if ("list" === t.type || "map" === t.type) {
            const v = t.value as string;
            if ("string" !== typeof t.value) {
                throw new Error(`[${type}] missing/invalid value`);
            }
            if (!(v in primes || v in types)) {
                throw new Error(`[${type}] unknown alias type`);
            }
            if (grouptype.includes(v)) {
                throw new Error(`[${type}] value can't use [${v}]`);
            }
            if (!(v in primes) && !(v in types)) {
                throw new Error(`[${type}] unknown alias type [${v}]`);
            }
        }
    }
};

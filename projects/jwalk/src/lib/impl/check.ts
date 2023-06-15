import { resolver } from "./resolver";

import type { TypeDetail } from "../types/detail";

export const check = {
    check: (
        type: string,
        t: TypeDetail,
        primes: Record<string, unknown>,
        types: Record<string, TypeDetail>
    ) => {
        if (type in primes) {
            throw new Error(`[${type}] is reserved`);
        }

        if (type in types) {
            throw new Error(`[${type}] already registered`);
        }

        const rtype = resolver.type(t.type, primes, types);
        if (!(rtype in primes)) {
            throw new Error(`[${type}] unknown alias type [${rtype}]`);
        }

        if ("tuple" !== rtype && "object" !== rtype) {
            if (t.value != null) {
                throw new Error(`[${type}] "${t.type}" can't have "value"`);
            }
        }

        if (t.type in primes) {
            if (null == t.action) {
                throw new Error(`[${type}] requires an action [${t.type}]`);
            }
        } else if (null != t.action) {
            throw new Error(`[${type}] already has an action [${t.type}]`);
        }

        if (null != t.value) {
            for (const i of t.value) {
                if ("object" === rtype && null == i.key) {
                    throw new Error(`[${type}] values require "key"`);
                }
                if (null == i.type) {
                    throw new Error(`[${type}] values require "type"`);
                }
            }
        }

        const recurse = (subtype: string, value: TypeDetail["value"]) => {
            const rtype = resolver.type(subtype, primes, types);
            if ("tuple" === rtype || "object" === rtype) {
                if (null == value) {
                    const rvalue = resolver.value(subtype, primes, types);
                    if (null == rvalue) {
                        throw new Error(`[${type}] "${subtype}" requires "value"`);
                    }
                }
                if (value != null) {
                    for (const i of value) {
                        if (null != i.type) {
                            recurse(
                                i.type,
                                (i.value as TypeDetail["value"]) ??
                                    resolver.value(i.type, primes, types)?.value
                            );
                        }
                    }
                }
            }
        };

        if ("ROOT" === type) {
            recurse(t.type, t.value);
        } else {
            for (const i of t.value ?? []) {
                if (null != i.type) {
                    recurse(
                        i.type,
                        (i.value as TypeDetail["value"]) ??
                            resolver.value(i.type, primes, types)?.value
                    );
                }
            }
        }
    }
};

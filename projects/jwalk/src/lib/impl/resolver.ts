import type { TypeDetail } from "../types/detail";

export const resolver = {
    type: <Primes extends Record<string, unknown>, Types extends Record<string, TypeDetail>>(
        type: string,
        primes: Primes,
        types: Types
    ) => {
        while (type in types) {
            type = types[type].type;
        }
        return type;
    },
    action: <Primes extends Record<string, unknown>, Types extends Record<string, TypeDetail>>(
        type: string,
        primes: Primes,
        types: Types
    ): null | { type: string; action: Exclude<TypeDetail["action"], undefined> } => {
        // probably dead code due to previous checks
        // kept to align logic with resolver.value
        if (!(type in types)) {
            return null;
        }
        const detail = types[type];
        if (null != detail.action) {
            return { type, action: detail.action };
        } else {
            return resolver.action(detail.type, primes, types);
        }
    },
    value: <Primes extends Record<string, unknown>, Types extends Record<string, TypeDetail>>(
        type: string,
        primes: Primes,
        types: Types
    ): null | { type: string; value: TypeDetail["value"] } => {
        if (!(type in types)) {
            return null;
        }
        const detail = types[type];

        if (null != detail.value) {
            return { type, value: detail.value };
        } else {
            return resolver.value(detail.type, primes, types);
        }
    },
    resolve: <Primes extends Record<string, unknown>, Types extends Record<string, TypeDetail>>(
        type: string,
        primes: Primes,
        types: Types
    ) => {
        return {
            type: resolver.type(type, primes, types),
            action: resolver.action(type, primes, types)?.action
        };
    }
};

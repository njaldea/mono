import { Builder } from "./Builder";
export type { Action, ObjectActions, TupleActions } from "./types/types";

/**
 * PrimeType are the leaf nodes
 * Builtin Primes are:
 * - number
 * - string
 * - boolean
 * - tuple
 * - object
 *
 * GroupType is removed but will be manually checked when necessary by using Exclude
 */
export const jwalker = <Node>() => {
    return new Builder<
        Node,
        {
            number: number;
            boolean: boolean;
            string: string;
            tuple: unknown[];
            object: Record<string, unknown>;
        },
        unknown
    >(
        {
            number: [{ type: "number" }],
            boolean: [{ type: "number" }],
            string: [{ type: "number" }],
            tuple: [{ type: "tuple" }],
            object: [{ type: "object" }]
        },
        {}
    );
};

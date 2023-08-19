import { UnionType } from "ts-json-schema-generator";
import type {
    SubTypeFormatter,
    ReferenceType,
    Definition,
    CircularReferenceTypeFormatter
} from "ts-json-schema-generator";

/**
 * Collapse a union of tuples from:
 * - from [a, a]|[a, a, a] to [a, a, a?]
 * the type has different meaning both in the schema and for typescript
 * even if the length is checked, the 3rd element can still be undefined
 *
 * the resulting json schema of [a, a, a?] is more desired since it only
 * creates 1 item with minItems and maxItems
 *
 * the resulting json scheme of [a, a]|[a, a, a] is an object with anyOf
 * where each item contains minItems and maxItems that are equal
 *
 * requirement of this is that each tuple contains the same items and their
 * lengths are continuous
 *
 * [a, a]|[a, a, a]|[a, a, a, a] - { minItems: 2, maxItems: 4 }
 * [a, a]|[a, a, a, a]           - will revert to default behavior
 * [a]|[a, a, a]|[a, a, a, a]    - the last two will not be collapsed
 */
export class UnionFormatter implements SubTypeFormatter {
    ref: CircularReferenceTypeFormatter;

    constructor(ref_: CircularReferenceTypeFormatter) {
        this.ref = ref_;
    }

    split(id: string) {
        return id
            .slice(1, id.length - 1)
            .split("|")
            .map((e) => {
                if ("[]" === e) {
                    return [];
                }
                return e.slice(1, e.length - 1).split(",");
            });
    }

    isContinuous(items: number[]) {
        const gen = this.each(items);
        const v = gen.next();
        if (!v.done) {
            for (const i of gen) {
                if (i === v.value + 1) {
                    v.value = i;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    isSame(items: string[]) {
        const gen = this.each(items);
        const v = gen.next();
        if (!v.done) {
            for (const i of gen) {
                if (i !== v.value) {
                    return false;
                }
            }
        }
        return true;
    }

    *each<T>(v: T[]) {
        for (const i of v) {
            yield i;
        }
    }

    supportsType(type: ReferenceType): boolean {
        if (!(type instanceof UnionType)) {
            return false;
        }

        const definitions = type.getTypes().map((t) => this.ref.getDefinition(t));

        if (definitions.some((t) => t.type !== "array")) {
            return false;
        }

        const ids = this.split(type.getId());
        return this.isSame(ids.flat()) && this.isContinuous(ids.map((i) => i.length).sort());
    }

    getDefinition(type: UnionType): Definition {
        const definitions = type.getTypes().map((t) => this.ref.getDefinition(t));
        return definitions.reduce((acc, current) => {
            return {
                ...current,
                maxItems: Math.max(acc.maxItems ?? -Infinity, current.maxItems ?? -Infinity),
                minItems: Math.min(acc.minItems ?? Infinity, current.minItems ?? Infinity)
            };
        }, {});
    }

    getChildren() {
        return [];
    }
}

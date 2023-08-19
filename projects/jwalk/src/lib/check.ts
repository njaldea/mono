import type { GroupType } from "./types/utils";

const grouptype = ["tuple", "object", "map", "list"] as readonly string[];

export type TypeDetailNode<Context, Type> = Type extends GroupType
    ? {
          type: Type;
          content: Type extends "tuple" | "object" ? readonly string[] : string;
          action?: (args: {
              readonly context: Context;
              readonly value: unknown;
              readonly refs: unknown;
              readonly auto: unknown;
              readonly meta: unknown;
          }) => { update: (vv: unknown) => void; destroy: () => void };
      }
    : {
          type: Type;
          refs?: readonly string[];
          action: (args: {
              readonly context: Context;
              readonly value: unknown;
              readonly refs: unknown;
          }) => { update: (vv: unknown) => void; destroy: () => void };
      };

export type TypeDetail<Context> =
    | TypeDetailNode<Context, "map">
    | TypeDetailNode<Context, "list">
    | TypeDetailNode<Context, "object">
    | TypeDetailNode<Context, "tuple">
    | TypeDetailNode<Context, string>; // for non-group type

export const check = {
    type: (
        type: string,
        detail: readonly { type: string; content?: readonly string[] | string }[],
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
                if (!Array.isArray(item.content)) {
                    throw new Error(`[${type}] missing/invalid content`);
                }
                for (const v of item.content as string[]) {
                    const content = v.split(":");
                    if (content.length !== 2) {
                        throw new Error(
                            `[${item.type}] expecting "key:type" format. trying to use [${v}]`
                        );
                    }
                    if (grouptype.includes(content[1])) {
                        throw new Error(
                            `[${item.type}] nested group type is not supported. trying to use [${v}]`
                        );
                    }
                    if (!(content[1] in primes)) {
                        throw new Error(`[${item.type}] unknown alias type [${content[1]}]`);
                    }
                }
            } else if ("tuple" === item.type) {
                if (!Array.isArray(item.content)) {
                    throw new Error(`[${type}] missing/invalid content`);
                }
                for (const v of item.content as string[]) {
                    if (grouptype.includes(v)) {
                        throw new Error(
                            `[${item.type}] nested group type is not supported. trying to use [${v}]`
                        );
                    }
                    if (!(v in primes)) {
                        throw new Error(`[${item.type}] unknown alias type [${v}]`);
                    }
                }
            } else if ("map" === item.type || "list" === item.type) {
                if ("string" !== typeof item.content) {
                    throw new Error(`[${item.type}] missing/invalid content`);
                }
                if (!(item.content in primes)) {
                    throw new Error(`[${item.type}] unknown alias type [${item.content}]`);
                }
            } else if (null != item.content) {
                throw new Error(`[${item.type}] unexpected content provided`);
            }
        }
    },
    node: <Context>(
        type: string,
        t: TypeDetail<Context>,
        primes: Record<string, unknown>,
        types: Record<string, TypeDetail<Context>>
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
            if ("content" in t) {
                throw new Error(`[${type}] "${t.type}" can't have "content"`);
            }
            if ("refs" in t) {
                if (!Array.isArray(t.refs)) {
                    throw new Error(`[${type}] invalid refs`);
                }
                for (const ref of t.refs as string[]) {
                    if (!(ref in types)) {
                        throw new Error(`[${type}] refs can't use [${ref}]`);
                    }
                }
            }
        } else {
            if (!("content" in t)) {
                throw new Error(`[${type}] missing/invalid content`);
            }
            if ("refs" in t) {
                throw new Error(`[${type}] "${t.type}" can't have "refs"`);
            }
            if ("tuple" === t.type) {
                if (!Array.isArray(t.content)) {
                    throw new Error(`[${type}] missing/invalid content`);
                }
                for (const content of t.content as string[]) {
                    if (grouptype.includes(content)) {
                        throw new Error(`[${type}] can't use [${content}]`);
                    }
                    if (!(content in primes) && !(content in types)) {
                        throw new Error(`[${type}] unknown alias type [${content}]`);
                    }
                }
            } else if ("object" === t.type) {
                if (!Array.isArray(t.content)) {
                    throw new Error(`[${type}] missing/invalid content`);
                }
                for (const c of t.content as string[]) {
                    const content = c.split(":");
                    if (content.length !== 2) {
                        throw new Error(
                            `[${t.type}] expecting "key:type" format. trying to use [${c}]`
                        );
                    }
                    if (grouptype.includes(content[1])) {
                        throw new Error(
                            `[${t.type}] nested group type is not supported. trying to use [${c}]`
                        );
                    }
                    if (!(content[1] in primes) && !(content[1] in types)) {
                        throw new Error(`[${type}] unknown alias type [${content[1]}]`);
                    }
                }
            } else {
                const c = t.content;
                if ("string" !== typeof c) {
                    throw new Error(`[${type}] missing/invalid content`);
                }
                if (!(c in primes || c in types)) {
                    throw new Error(`[${type}] unknown alias type`);
                }
                if (grouptype.includes(c)) {
                    throw new Error(`[${type}] can't use [${c}]`);
                }
                if (!(c in primes) && !(c in types)) {
                    throw new Error(`[${type}] unknown alias type [${c}]`);
                }
            }
        }
    }
};

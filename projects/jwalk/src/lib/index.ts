import { check } from "./check";
import { resolver } from "./resolver";
import { basetype } from "./constants";
import type { BuiltInType, GroupType } from "./constants";

type ResolveType<T> = T extends "number"
    ? number
    : T extends "boolean"
    ? boolean
    : T extends "string"
    ? string
    : T extends "tuple"
    ? unknown[]
    : T extends "object"
    ? Record<string, unknown>
    : never;

type UniqueKey<Key extends string, Keys> = Key extends Keys
    ? "Type already defined, use a different key."
    : Key;

type HasAction<Type, Types> = Type extends keyof Types
    ? "action" extends keyof Types[Type]
        ? true
        : false
    : false;

type ResolveTypeRecurse<Types, Key extends keyof Types | BuiltInType> = Key extends BuiltInType
    ? ResolveType<Key>
    : Key extends keyof Types
    ? Types[Key] extends { type: infer Type extends keyof Types | BuiltInType }
        ? ResolveTypeRecurse<Types, Type>
        : never
    : never;

type RootValue<Types> = Types extends { ROOT: infer Root }
    ? ResolveTypeRecurse<Types, "ROOT">
    : never;

interface Prettify {
    output: this extends { input: infer Input } ? { [K in keyof Input]: Input[K] } : never;
}

interface Merge {
    output: this extends {
        from: infer From;
        to: infer To;
    }
        ? (Prettify & { input: From & To })["output"]
        : never;
}

type AddInfoPrimitive<Key, Node> = Key extends "number"
    ? (
          node: Node,
          value: number
      ) => {
          update: (value: number) => void;
          destroy: () => void;
      }
    : Key extends "boolean"
    ? (
          node: Node,
          value: boolean
      ) => {
          update: (value: boolean) => void;
          destroy: () => void;
      }
    : Key extends "string"
    ? (
          node: Node,
          value: string
      ) => {
          update: (value: string) => void;
          destroy: () => void;
      }
    : Key extends "object"
    ? (
          node: Node,
          value: Record<string, unknown>,
          detail: {
              actions: readonly {
                  key: string;
                  type: string;
                  action: (
                      node: Node,
                      value: unknown
                  ) => {
                      update: (value: unknown) => void;
                      destroy: () => void;
                  };
              }[];
          }
      ) => {
          update: (value: Record<string, unknown>) => void;
          destroy: () => void;
      }
    : Key extends "tuple"
    ? (
          node: Node,
          value: unknown[],
          detail: {
              actions: {
                  key: number;
                  type: string;
                  action: (
                      node: Node,
                      value: unknown
                  ) => {
                      update: (value: unknown) => void;
                      destroy: () => void;
                  };
              }[];
          }
      ) => {
          update: (value: unknown[]) => void;
          destroy: () => void;
      }
    : never;

interface InfoType {
    output: this extends {
        type: infer Type;
        node: infer Node;
        types: infer Types;
    }
        ? HasAction<Type, Types> extends true
            ? { action: { __error: "Parent already has an action." } }
            : { readonly action: AddInfoPrimitive<Type, Node> }
        : never;
}

type IsTuple<T> = T extends readonly any[]
    ? string extends T[number][keyof T[number]]
        ? { __error: "use `as const` or `jwalk_value/jwalk_type`" }
        : T["length"] extends number
        ? number extends T["length"]
            ? { __error: "use `as const` or `jwalk_value/jwalk_type`" }
            : T
        : { __error: "use `as const` or `jwalk_value/jwalk_type`" }
    : never;

interface Actionify {
    output: this extends {
        value: readonly [infer First, ...infer Rest];
        node: infer Node;
        types: infer Types;
        processed: infer Processed extends readonly any[];
    }
        ? First extends { readonly type: infer Type; readonly key: infer Key }
            ? [
                  {
                      key: Key;
                      type: Type;
                      action: (
                          node: Node,
                          value: ResolveType<Type>
                      ) => {
                          update: (value: ResolveType<Type>) => void;
                          destroy: () => void;
                      };
                  },
                  ...(Actionify & {
                      value: Rest;
                      node: Node;
                      types: Types;
                      processed: [...Processed, First];
                  })["output"]
              ]
            : First extends { readonly type: infer Type }
            ? [
                  {
                      key: Processed["length"];
                      type: Type;
                      action: (
                          node: Node,
                          value: ResolveType<Type>
                      ) => {
                          update: (value: ResolveType<Type>) => void;
                          destroy: () => void;
                      };
                  },
                  ...(Actionify & {
                      value: Rest;
                      node: Node;
                      types: Types;
                      processed: [...Processed, First];
                  })["output"]
              ]
            : []
        : [];
}

interface ValueObject {
    output: this extends {
        value: readonly [infer First, ...infer Rest];
        node: infer Node;
        types: infer Types;
    }
        ? First extends { readonly key: infer Key extends string; readonly type: infer Type }
            ? (Prettify & {
                  input: {
                      readonly [K in Key]: ResolveType<Type>;
                  } & (ValueObject & { value: Rest; node: Node; types: Types })["output"];
              })["output"]
            : {}
        : {};
}

interface ValueTuple {
    output: this extends {
        value: readonly [infer First, ...infer Rest];
        node: infer Node;
        types: infer Types;
    }
        ? First extends { readonly type: infer Type }
            ? readonly [
                  ResolveType<Type>,
                  ...(ValueTuple & { value: Rest; node: Node; types: Types })["output"]
              ]
            : []
        : [];
}

interface InfoGroupT {
    output: this extends {
        value: infer Value;
        node: infer Node;
        types: infer Types;
        vt: infer VT;
    }
        ? VT & { value: Value; node: Node; types: Types } extends { output: infer Output }
            ? {
                  readonly action: (
                      node: Node,
                      value: Output,
                      detail: {
                          readonly actions: (Actionify & {
                              value: Value;
                              node: Node;
                              types: Types;
                              processed: [];
                          })["output"];
                      }
                  ) => {
                      update: (value: Output) => void;
                      destroy: () => void;
                  };
              }
            : never
        : never;
}

interface InfoGroup {
    output: this extends {
        type: infer Type extends "tuple" | "object";
        value: infer Value;
        node: infer Node;
        types: infer Types;
    }
        ? HasAction<Type, Types> extends true
            ? { action: { __error: "Parent already has an action." } }
            : Type extends "tuple"
            ? (InfoGroupT & { value: Value; node: Node; types: Types; vt: ValueTuple })["output"]
            : Type extends "object"
            ? (InfoGroupT & { value: Value; node: Node; types: Types; vt: ValueObject })["output"]
            : never
        : never;
}

interface ValueType {
    output: this extends {
        type: infer Type;
        types: infer Types;
    }
        ? Type extends "tuple"
            ? readonly { readonly type: keyof Types | BuiltInType }[]
            : Type extends "object"
            ? readonly { readonly key: string; readonly type: keyof Types | BuiltInType }[]
            : never
        : never;
}

// find the final type of an alias (until primitive is found)
type SubType<T, Types> = T extends BuiltInType
    ? T
    : T extends keyof Types
    ? Types[T] extends { type: infer S }
        ? SubType<S, Types>
        : never
    : never;

type IsValidValue<Type, Types, Value> = Type extends GroupType // root can't have value
    ? IsTuple<Value>
    : SubType<Type, Types> extends GroupType
    ? Type extends keyof Types
        ? Types[Type] extends { value: infer SubValue }
            ? { __error: "Parent already has a value." }
            : Types[Type] extends { type: infer SubType }
            ? IsValidValue<SubType, Types, Value>
            : never
        : never
    : Type extends string
    ? { __error: `[${Type}] can't have a value` }
    : never;

class Builder<Node, Types extends Record<string, unknown>> {
    #mapping: Types;

    constructor(mapping: Types) {
        this.#mapping = mapping;
    }

    // key - primitive - action
    add<
        Key extends string,
        Type extends BuiltInType,
        Info extends (InfoType & { type: Type; node: Node; types: Types })["output"]
    >(
        key: UniqueKey<Key, keyof Types>,
        type: Type,
        info: Info
    ): Builder<
        Node,
        (Merge & {
            from: Types;
            to: { [K in Key]: (Merge & { from: Info; to: { readonly type: Type } })["output"] };
        })["output"]
    >;
    // key - alias - value (no-action)
    add<
        Key extends string,
        Type extends keyof Types,
        Value extends (ValueType & { type: SubType<Type, Types>; types: Types })["output"]
    >(
        key: UniqueKey<Key, keyof Types>,
        type: Type,
        value: IsValidValue<Type, Types, Value>
    ): Builder<
        Node,
        (Merge & {
            from: Types;
            to: {
                [K in Key]: (Merge & {
                    from: {};
                    to: { type: Type; value: IsTuple<Value> };
                })["output"];
            };
        })["output"]
    >;
    // key - alias - value (no-action)
    add<
        Key extends string,
        Type extends GroupType,
        Value extends (ValueType & { type: SubType<Type, Types>; types: Types })["output"],
        Info extends (InfoGroup & { type: Type; value: Value; node: Node; types: Types })["output"]
    >(
        key: UniqueKey<Key, keyof Types>,
        type: Type,
        value: IsValidValue<Type, Types, Value>,
        info: Info
    ): Builder<
        Node,
        (Merge & {
            from: Types;
            to: {
                [K in Key]: (Merge & {
                    from: {};
                    to: { type: Type; value: IsTuple<Value> };
                })["output"];
            };
        })["output"]
    >;
    add(...args: any[]): never {
        if (3 === args.length) {
            const [key, alias, detail] = args;
            if (Array.isArray(detail)) {
                //  treat as values
                const action = { type: alias, value: detail };
                check.check(key, action, this.#mapping);
                const n = { ...this.#mapping, [key]: action };
                return new Builder<Node, typeof n>(n) as never;
            } else {
                // treat as action
                const action = { ...detail, type: alias };
                check.check(key, action, this.#mapping);
                const n = { ...this.#mapping, [key]: action };
                return new Builder<Node, typeof n>(n) as never;
            }
        } else if (4 === args.length) {
            const [key, alias, value, info] = args;
            const action = { value: value, type: alias, ...info };
            check.check(key, action, this.#mapping);
            const n = { ...this.#mapping, [key]: action };
            return new Builder<Node, typeof n>(n) as never;
        } else {
            throw new Error(`Invalid arguments provided.`);
        }
    }

    build(node: Node, value: RootValue<Types>) {
        const genaction = <Key, Info>(itype: string, ivalue: any) => {
            return (node: Node, value: unknown) => {
                const { type, action } = resolver.resolve(itype, this.#mapping);
                if (action != null) {
                    if (basetype.includes(type)) {
                        return action(node, value);
                    }

                    if ("tuple" === type) {
                        return action(node, value, {
                            actions: ivalue.map((v, i) => ({
                                type: v.type,
                                key: i,
                                action: genaction(
                                    v.type,
                                    v.value ?? resolver.value(v.type, this.#mapping)?.value
                                )
                            }))
                        });
                    }

                    if ("object" === type) {
                        return action(node, value, {
                            actions: ivalue.map((v) => ({
                                type: v.type,
                                key: v.key,
                                action: genaction(
                                    v.type,
                                    v.value ?? resolver.value(v.type, this.#mapping)?.value
                                )
                            }))
                        });
                    }
                }
                return {
                    update: () => {},
                    destroy: () => {}
                };
            };
        };
        if (this.#mapping.ROOT == null) {
            throw new Error(`ROOT is not registered`);
        }
        return genaction("ROOT", resolver.value("ROOT", this.#mapping)?.value)(node, value);
    }
}

export const jwalker = <M>() => {
    return new Builder<M, {}>({});
};

export const jwalk_value = <T extends readonly any[]>(...v: T) => v;
export const jwalk_type = <T extends string>(v: T) => v;

export type Action<Type extends "tuple" | "object", Node, Value> = Type extends "tuple"
    ? {
          key: number;
          type: string;
          action: (
              node: Node,
              value: Value
          ) => {
              update: (value: Value) => void;
              destroy: () => void;
          };
      }
    : {
          key: string;
          type: string;
          action: (
              node: Node,
              value: Value
          ) => {
              update: (value: Value) => void;
              destroy: () => void;
          };
      };

// TODO:
// - cleanup
// - validate value recursively
// - test multilevel alias
// - align exception thrown to type lint error

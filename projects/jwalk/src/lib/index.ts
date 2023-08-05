import { Builder, type Memoizer } from "./builder";

export const memoizer: Memoizer = <Value>(value: Value) => {
    return (v: Value) => {
        if (v instanceof Object) {
            return true;
        } else if (v !== value) {
            value = v;
            return true;
        }
        return false;
    };
};

const noop: Memoizer = () => () => true;

export type Options = {
    memoizer: Memoizer;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jwalker = <Context = any>(options?: Partial<Options>) => {
    return new Builder<
        Context,
        "number" | "boolean" | "string",
        {
            number: number;
            boolean: boolean;
            string: string;
        }
    >(
        options?.memoizer ?? noop,
        {
            number: [{ type: "number" }],
            boolean: [{ type: "number" }],
            string: [{ type: "number" }]
        } as const,
        {}
    );
};

// TODO: move to a separate workspace or repo

// Provides auto complete for each of the paths
// trailing `/` is considered invalid
type JSON_PTR<T, V> = T extends string | number | boolean
    ? ""
    : T extends []
    ? ""
    : T extends [...infer SRest, infer S]
    ?
          | JSON_PTR<SRest, V>
          | (V extends ""
                ? "/" | `/${SRest["length"]}${JSON_PTR<S, "/">}`
                : V extends `/${infer FR extends SRest["length"]}/${infer RR}`
                ? `/${FR}${JSON_PTR<S, `/${RR}`>}`
                : V extends `/${infer FR extends SRest["length"]}`
                ? `/${FR}` | `/${FR}${JSON_PTR<S, "">}`
                : `/${SRest["length"]}` | `/${SRest["length"]}${JSON_PTR<S, "">}`)
    : T extends (infer S)[]
    ? V extends ""
        ? "/" | `/${number}${JSON_PTR<S, "/">}`
        : V extends `/${infer FR extends number}/${infer RR}`
        ? `/${FR}${JSON_PTR<S, `/${RR}`>}/`
        : V extends `/${infer FR extends number}`
        ? `/${FR}` | `/${FR}${JSON_PTR<S, "">}`
        : "/0" | `/0${JSON_PTR<S, "">}`
    : V extends `/${infer First extends keyof T & string}/${infer Rest}`
    ? `/${First}${JSON_PTR<T[First], `/${Rest}`>}`
    : V extends `/${infer First extends keyof T & string}`
    ? `/${First}` | `/${First}${JSON_PTR<T[First], "">}`
    : {
          [K in keyof T & string]: `/${K}` | `/${K}${JSON_PTR<T[K], "">}`;
      }[keyof T & string];

type User = {
    id: string;
    age: number;
    name: {
        first: string;
        last: string;
    };
    aliases: {
        n: string;
        t: number;
    }[];
    addresses: [{ p1: boolean }[], { city: boolean }[], { ff: string }];
};
type JSON_PTR_F<T, V> = JSON_PTR<T, V> extends V ? V : JSON_PTR<T, V>;

const jsonptr = <V extends string>(v: JSON_PTR_F<User, V>) => v;
type Z = JSON_PTR<User, "/name">;
const z = jsonptr("/name");

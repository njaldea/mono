import { Builder } from "./Builder";
import type { ActionItem, Action as A } from "./types/actionargs";

export type Action<Context, Value> = (A & { context: Context; value: Value })["output"];

export type TupleActions<Context> = readonly (ActionItem & {
    context: Context;
    key: number;
    type: string;
    value: any;
})["output"][];

export type ObjectActions<Context> = readonly (ActionItem & {
    context: Context;
    key: string;
    type: string;
    value: any;
})["output"][];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jwalker = <Node = any>() => {
    return new Builder<
        Node,
        "number" | "boolean" | "string",
        {
            number: number;
            boolean: boolean;
            string: string;
        }
    >(
        {
            number: [{ type: "number" }],
            boolean: [{ type: "number" }],
            string: [{ type: "number" }]
        },
        {}
    );
};

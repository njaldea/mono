import { Builder } from "./Builder";

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

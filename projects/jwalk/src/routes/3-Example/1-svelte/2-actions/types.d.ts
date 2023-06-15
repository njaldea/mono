export type Action<Context, Value> = (
    context: Context,
    value?: Value
) => {
    update: (value?: Value) => void;
    destroy: () => void;
};

export type Context = {
    readonly key?: string | number;
    readonly notify?: (path: string, value: unknown) => void;
};

export type Node = {
    target: HTMLDivElement;
    context: Context;
};

export type Adapter = (
    action: Action<Node, unknown>,
    context: Context,
    key: string | number
) => Action<HTMLDivElement, unknown>;

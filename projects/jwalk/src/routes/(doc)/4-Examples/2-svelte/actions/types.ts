import type { Writable } from "svelte/store";

export type AutoAction<Context, Value> = (
    create: (key: string) => Context,
    destroy: (key: string, context: Context) => void,
    value: Value
) => {
    update: (value: Value) => void;
    destroy: () => void;
};

export type Action<Context, Value> = (
    context: Context,
    value: Value
) => {
    update: (value: Value) => void;
    destroy: () => void;
};

export type State = {
    expand: Writable<boolean>;
    children: Record<string | number, State>;
};

export type Context = {
    target: HTMLDivElement;
    detail: {
        readonly key?: string | number;
        readonly notify: (path: string, value: unknown) => void;
        readonly state: State;
    };
};

export type Adapter<Value> = (
    action: AutoAction<Node, Value>,
    detail: Context["detail"]
) => Action<HTMLDivElement, Value>;

import type { SvelteComponent } from "svelte";
import type { AutoAction, Context, Action, Node } from "./types";

export const adapter = <Value>(
    action: AutoAction<Node, Value>,
    context: Context
): Action<HTMLDivElement, Value> => {
    return (target, value) => {
        return action(
            (key) => {
                return {
                    target,
                    context: {
                        notify: (path, value) => context.notify(`/${key}${path}`, value),
                        key: key
                    }
                };
            },
            () => {},
            value
        );
    };
};

export const toSvelteAction = <
    Props,
    T extends new (args: { target: HTMLElement; props: Props }) => SvelteComponent
>(
    Component: T,
    target: HTMLElement,
    props: Props
) => {
    const instance = new Component({ target, props });
    return {
        update: (value: unknown) => instance.$set({ value }),
        destroy: () => instance.$destroy()
    };
};
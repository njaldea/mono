import { getContext, setContext } from "svelte";

const raise = <T>(m: string): T => {
    throw m;
};

export const create = <T>(tag: symbol, message?: string) => ({
    get: message
        ? () => getContext<T | undefined>(tag) ?? raise<T>(message)
        : () => getContext<T>(tag),
    set: (o: T) => setContext(tag, o)
});

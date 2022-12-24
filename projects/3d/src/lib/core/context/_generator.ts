import { getContext, setContext } from "svelte";

export const create = <T>(tag: symbol) => ({
    get: () => getContext<T>(tag),
    set: (o: T) => setContext(tag, o)
});

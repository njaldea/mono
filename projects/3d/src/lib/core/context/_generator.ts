import { getContext, setContext } from "svelte";

export function create<T>(tag: symbol) {
    return {
        get: () => getContext<T>(tag),
        set: (o: T) => setContext(tag, o)
    };
}

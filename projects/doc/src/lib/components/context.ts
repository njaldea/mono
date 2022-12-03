import { setContext, getContext } from "svelte";

const root = Symbol();

export function inRoot() {
    const value = getContext(root);
    setContext(root, false);
    return value !== false;
}

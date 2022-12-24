import { setContext, getContext } from "svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

const root = Symbol();

export const inRoot = () => {
    const value = getContext(root);
    setContext(root, false);
    return value !== false;
};

const theme = Symbol();

export type Theme = undefined | "light" | "dark";

export const getTheme = () => getContext<Writable<boolean>>(theme);

export const initTheme = () => setContext<Writable<boolean>>(theme, writable(true));

export const evalTheme = (parent: boolean, theme: Theme) => {
    if (theme === undefined) {
        return parent;
    }
    return "dark" === theme;
};

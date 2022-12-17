import { setContext, getContext } from "svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

const root = Symbol();

export function inRoot() {
    const value = getContext(root);
    setContext(root, false);
    return value !== false;
}

const theme = Symbol();

export type Theme = undefined | "light" | "dark";

export function getTheme() {
    return getContext<Writable<boolean>>(theme);
}

export function initTheme() {
    return setContext<Writable<boolean>>(theme, writable(true));
}

export function evalTheme(parent: boolean, theme: Theme) {
    return theme === undefined ? parent : theme === "dark";
}

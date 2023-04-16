import { setContext, getContext } from "svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

const theme = Symbol();

export type Theme = undefined | "light" | "dark";

export const getTheme = () => getContext<Writable<boolean> | undefined>(theme) ?? writable(true);
export const initTheme = () => setContext<Writable<boolean>>(theme, writable(true));

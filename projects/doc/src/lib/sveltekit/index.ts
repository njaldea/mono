import { derived, writable, type Readable, type Writable } from "svelte/store";
import { page } from "$app/stores";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";

import type { Theme } from "../components/context";

const toRoute = (p: string) => p.substring(1, p.lastIndexOf("/"));

const routeHasLayoutGroup = /\(.*\)/;
const collapseLayout = (p: string) =>
    p
        .split("/")
        .filter((p) => null == routeHasLayoutGroup.exec(p))
        .join("/");

const isNotRoot = (p: string) => p !== "/";

const routeIsDynamic = /.*\[.*\].*/;
const isRouteDynamic = (p: string) => null == routeIsDynamic.exec(p);

type Settings = {
    /**
     * List of routes
     */
    data: string[];
    /**
     * Current route but removes unneeded group layout in the route
     */
    current: Readable<string | null>;
    /**
     * Callback to navigate to other pages
     * @param e - event that contains detail about the target url
     */
    navigate: (e: CustomEvent<string>) => Promise<void>;
    /**
     * A store that is responsible in keeping the theme in localStorage
     * Default is "dark"
     */
    theme: Writable<Exclude<Theme, undefined>>;
    /**
     * A store that is responsible in keeping the offset in localStorage
     * offset is the width of the navigation panel.
     * Default is 250px
     */
    offset: Writable<number>;
    panel: Writable<"bottom" | "right">;
};

/**
 * Dedicated helper method to be used for sveltekit
 * @param detail - vite's `import.meta.glob(...)`
 * @param prefix - only use when layout is not in the root route
 * @returns Settings
 */
export const sveltekit = (
    detail: Record<string, unknown>,
    prefix: string | null = null
): Settings => {
    const keyTheme = "@nil-/doc/theme";
    const theme = browser && "light" === localStorage.getItem(keyTheme) ? "light" : "dark";
    const keyOffset = "@nil-/doc/offset";
    const offset = browser ? parseFloat(localStorage.getItem(keyOffset) ?? "250") : 250;
    const keyPos = "@nil-/doc/panel";
    const panelPos = browser ? localStorage.getItem(keyPos) ?? "bottom" : "bottom";

    const result: Settings = {
        data: Object.keys(detail)
            .map(toRoute)
            .map(collapseLayout)
            .filter(isNotRoot)
            .filter(isRouteDynamic),
        current: derived(page, ($page) => {
            if ($page.route.id) {
                if (prefix) {
                    return collapseLayout($page.route.id.substring(prefix.length));
                }
                return collapseLayout($page.route.id);
            }
            return null;
        }),
        navigate: prefix ? (e) => goto(`${prefix}${e.detail}`) : (e) => goto(e.detail),
        theme: writable<Exclude<Theme, undefined>>(theme),
        offset: writable<number>(offset),
        panel: writable(panelPos as "bottom" | "right")
    };
    browser && result.theme.subscribe((v) => localStorage.setItem(keyTheme, v));
    browser && result.offset.subscribe((v) => localStorage.setItem(keyOffset, `${v}`));
    browser && result.panel.subscribe((v) => localStorage.setItem(keyPos, v));
    return result;
};

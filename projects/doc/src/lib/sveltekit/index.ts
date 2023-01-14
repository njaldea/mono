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
};

/**
 * Dedicated helper method to be used for sveltekit
 * @param detail - vite's `import.meta.glob(..., { eager: true })`
 * @param prefix - only use when layout is not in the root route
 * @returns Settings
 */
export const sveltekit = (
    detail: Record<string, unknown>,
    prefix: string | null = null
): Settings => {
    const key = "@nil-/doc/theme";
    const initialValue = browser && "light" === localStorage.getItem(key) ? "light" : "dark";
    const theme = writable<Exclude<Theme, undefined>>(initialValue);
    theme.subscribe((v) => browser && localStorage.setItem(key, v));

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
        theme
    };
    return result;
};
